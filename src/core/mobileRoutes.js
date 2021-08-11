import bodyParser from 'body-parser';
import { sendEmail } from './email/sendEmail';
import { verifyJWTToken } from '../helpers/auth';
import { profilePhotouploadDir, fileuploadDir } from '../config';
import multer from 'multer';
import sharp from 'sharp';
const crypto = require('crypto');
const fs = require('fs');
import { User, UserProfile, Listing, ListPhotos, WishList, Reservation } from '../data/models';
const mobileRoutes = app => {
  var storage = multer.diskStorage({
    destination: profilePhotouploadDir,
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err);

        let ext;

        switch (file.mimetype) {
          case 'image/jpeg':
            ext = '.jpeg';
            break;
          case 'image/png':
            ext = '.png';
            break;
        }

        cb(null, raw.toString('hex') + ext);
      })
    }
  });
  var upload = multer({ storage: storage });
  function removeFiles(fileName, filePath) {

    if (fs.existsSync(filePath + fileName)) {
      // Original
      fs.unlink(filePath + fileName, (err) => {
        if (err) throw err;
        console.log('successfully deleted');
      });
    }

    if (fs.existsSync(filePath + 'small_' + fileName)) {
      // small
      fs.unlink(filePath + 'small_' + fileName, (err) => {
        if (err) throw err;
        console.log('successfully deleted');
      });
    }

    if (fs.existsSync(filePath + 'x_small_' + fileName)) {
      // x_small
      fs.unlink(filePath + 'x_small_' + fileName, (err) => {
        if (err) throw err;
        console.log('successfully deleted');
      });
    }


    if (fs.existsSync(filePath + 'x_medium_' + fileName)) {
      // x_medium
      fs.unlink(filePath + 'x_medium_' + fileName, (err) => {
        if (err) throw err;
        console.log('successfully deleted');
      });
    }

    if (fs.existsSync(filePath + 'x_large_' + fileName)) {
      // x_large
      fs.unlink(filePath + 'x_large_' + fileName, (err) => {
        if (err) throw err;
        console.log('successfully deleted');
      });
    }

    if (fs.existsSync(filePath + 'xx_large_' + fileName)) {
      // xx_large
      fs.unlink(filePath + 'xx_large_' + fileName, (err) => {
        if (err) throw err;
        console.log('successfully deleted');
      });
    }
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/sendEmailTemplate', function (req, res, next) {
    next();
  }, async (req, res) => {
    let status = 200, errorMessage;
    let requestData = req.body;
    let requestHeader = req.headers;
    let isLoggedInUser, sendEmailStatus;

    try {
      if (requestHeader && requestHeader.auth) {
        isLoggedInUser = await verifyJWTToken(requestHeader.auth);
      }

      if (requestHeader && requestData &&
        ((requestHeader.isAuth === true && isLoggedInUser) || !requestHeader.isAuth)) {
        if (requestData.to && requestData.type) {
          sendEmailStatus = await sendEmail(requestData.to, requestData.type, requestData.content);
          status = sendEmailStatus.status;
          errorMessage = sendEmailStatus.response;
        } else {
          status = 400;
          errorMessage = 'Receipt address or template type is required';
        }
      } else {
        status = 400;
        errorMessage = 'Something went wrong';
      }
    } catch (error) {
      status = 400;
      errorMessage = 'Something went wrong!, ' + error;
    }

    res.send({
      status,
      errorMessage
    });
  });

  app.post('/deleteListPhotos', async function (req, res, next) {
    next();
  }, async (req, res) => {
    let status = 200, errorMessage, isLoggedInUser, where;
    let requestHeader = req.headers;
    let filePath = fileuploadDir;
    let fileName = req.body.fileName;
    let listId = req.body.listId;
    let checkForRemove;
    try {
      if (requestHeader && requestHeader.auth) {
        isLoggedInUser = await verifyJWTToken(requestHeader.auth);
      }
      if (requestHeader && ((requestHeader.isAuth === true && isLoggedInUser) || !requestHeader.isAuth)) {
        const userLogin = await User.findOne({
          attributes: ['email', 'id', 'userDeletedAt'],
          where: { email: isLoggedInUser.email, userDeletedAt: null },
        });
        if (userLogin) {
          where = {
            id: listId,
            userId: userLogin.id
          }
          // Check whether listing is available
          const isListingAvailable = await Listing.findOne({ where });

          if (isListingAvailable) {

            const getReservationCount = await Reservation.count({
              where: {
                listId,
                paymentState: 'completed',
                $or: [
                  {

                    reservationState: 'approved'
                  },
                  {
                    reservationState: 'pending'
                  }
                ],
              },
            });

            if (getReservationCount > 0) {
              const listPhotosCount = await ListPhotos.count({
                where: { listId },
                include: [
                  { model: Listing, as: 'listing', where: where }
                ]
              });


              if (listPhotosCount <= 1) {
                checkForRemove = false;
                status = 400;
                errorMessage = 'You cannot remove photos as you have upcoming bookings or enquiries for this listing.!';
                res.send({ status, errorMessage });
              } else {
                checkForRemove = true;
              }
            } else {
              checkForRemove = true;
            }
            if (checkForRemove) {
              const checkPhotoExist = await ListPhotos.findOne({
                where: {
                  listId: listId,
                  name: fileName,
                }
              });
              // Create a new record for a photo
              const removePhoto = await ListPhotos.destroy({
                where: {
                  listId: listId,
                  name: fileName,
                }
              });
              if (removePhoto) {
                const removePhoto = await ListPhotos.destroy({
                  where: {
                    listId: listId,
                    name: fileName,
                  }
                });
                const photosCount = await ListPhotos.count({ where: { listId } });

                if (photosCount < 1) {
                  const updateListingStatus = await Listing.update({
                    isPublished: false,
                    isReady: false,
                    coverPhoto: null
                  }, {
                      where: { id: listId }
                    });

                  let updateListStatus = await WishList.update({
                    isListActive: false
                  }, {
                      where: {
                        listId
                      }
                    });
                } else {
                  const changeListingCover = await Listing.findOne({
                    where: {
                      coverPhoto: checkPhotoExist.id
                    }
                  });
                  if (changeListingCover) {
                    await Listing.update({
                      coverPhoto: null
                    }, {
                        where: { id: listId }
                      });
                  }
                }
                await removeFiles(fileName, filePath);
              } else {
                status = 400;
                errorMessage = 'filename not exist'
              }
              res.send({ status, errorMessage });
            }
          } else {
            status = 400;
            errorMessage = 'List Not Available';
            res.send({ status, errorMessage });
          }
        } else {
          status = 400;
          errorMessage = 'Sorry user not exist in database!';
          res.send({ status, errorMessage });
        }
      }
    } catch (error) {
      status = 400;
      errorMessage = 'Something went wrong!, ' + error;
      res.send({ status, errorMessage });
    }


  });

  app.post('/uploadPhoto', function (req, res, next) {
    next();
  }, upload.single('file'), async (req, res, next) => {
    let file = req.file;
    let requestHeader = req.headers;
    let isLoggedInUser;
    let status = 200, errorMessage;
    try {
      if (requestHeader && requestHeader.auth) {
        isLoggedInUser = await verifyJWTToken(requestHeader.auth);
      }
      if (requestHeader && ((requestHeader.isAuth === true && isLoggedInUser) || !requestHeader.isAuth)) {
        const userLogin = await User.findOne({
          attributes: ['email', 'id', 'userDeletedAt'],
          where: { email: isLoggedInUser.email, userDeletedAt: null },
        });
        if (userLogin) {
          const userProfilePicture = await UserProfile.update({
            picture: file.filename,
          }, {
              where: {
                userId: userLogin.id
              }
            });
          if (userProfilePicture) {
            // small - 50 * 50
            const smallImage = await new Promise((resolve, reject) => {
              sharp(file.path)
                .rotate()
                .resize(100, 100)
                //.crop(sharp.strategy.entropy)
                .toFile(profilePhotouploadDir + 'small_' + file.filename, function (err) {
                  if (file) {
                    resolve(file)
                  } else {
                    reject(error)
                  }
                });
            });
            // medium - 100 * 100
            const mediumImage = await new Promise((resolve, reject) => {
              sharp(file.path)
                .rotate()
                .resize(255, 255)
                //.crop(sharp.strategy.entropy)
                .toFile(profilePhotouploadDir + 'medium_' + file.filename, function (err) {
                  if (file) {
                    resolve(file)
                  } else {
                    reject(error)
                  }
                });
            });
            res.send({ status, file });
          }
        } else {
          status = 400;
          errorMessage = 'Sorry user not exist in database!';
          res.send({ status, errorMessage });
        }
      }
    } catch (error) {
      status = 400;
      errorMessage = 'Something went wrong!, ' + error;
      res.send({ status, errorMessage });
    }
  });

  app.post('/deleteMultiFiles', function (req, res, next) {
    next();
  }, async (req, res) => {
    let status = 200, errorMessage;
    let requestHeader = req.headers;
    let isLoggedInUser;
    let filePath = fileuploadDir;
    var files = req.body.files;
    try {

      if (requestHeader && requestHeader.auth) {
        isLoggedInUser = await verifyJWTToken(requestHeader.auth);
      }

      let parsedFiles = JSON.parse(files);
      if (requestHeader &&
        ((requestHeader.isAuth === true && isLoggedInUser) || !requestHeader.isAuth)) {

        const userLogin = await User.findOne({
          attributes: ['email', 'id', 'userDeletedAt'],
          where: { email: isLoggedInUser.email, userDeletedAt: null },
        });

        if (userLogin) {

          if (parsedFiles != undefined && parsedFiles.length > 0) {

            parsedFiles.map(async function (item) {
              await removeFiles(item.name, filePath);
            });

            status = 200;
            errorMessage = 'SuccessFully files were removed';
          } else {
            status = 400;
            errorMessage = 'Files not deleted';
          }
        } else {
          status = 400;
          errorMessage = 'Sorry user not exist in database!';
          res.send({ status, errorMessage });
        }
      } else {
        status = 400;
        errorMessage = 'Something went wrong';
      }
    } catch (error) {
      status = 400;
      errorMessage = 'Something went wrong!, ' + error;
    }

    res.send({
      status,
      errorMessage
    });
  });

  app.get('/apple-app-site-association', function (req, res, next) {
    next();
  }, async (req, res) => {
    let responseJson = {
      applinks: {
        apps: [],
        details: [
          {
            appID: 'XAQ5F75F7R.com.rs.RentALL',
            'paths': ['/password/verification/', '/user/verification']
          }
        ]
      }
    };

    res.json(responseJson);
  });

};

export default mobileRoutes;
