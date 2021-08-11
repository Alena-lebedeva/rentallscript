import bodyParser from 'body-parser';
import { verifyJWTToken } from '../helpers/auth';
import { fileuploadDir } from '../config';
import multer from 'multer';
import sharp from 'sharp';
const crypto = require('crypto');
import { User, UserProfile, Listing, ListPhotos, UserListingSteps } from '../data/models';
const uploadListPhotoMobile = app => {
    var storage = multer.diskStorage({
        destination: fileuploadDir,
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
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());



    app.post('/uploadListPhoto', function (req, res, next) {
        next();
    }, upload.array('file'), async (req, res, next) => {
        let files = req.files;
        let listId = req.body.listId;
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

                    // small - 101 * 67
                    const smallImage = await new Promise((resolve, reject) => {
                        files && files.length > 0 && files.map((item, index) => {
                            sharp(files[index].path)
                                .rotate()
                                .resize(101, null)
                                //.crop(sharp.strategy.entropy)
                                .toFile(fileuploadDir + 'small_' + files[index].filename, function (err) {
                                    if (files) {
                                        resolve(files)
                                    } else {
                                        reject(error)
                                    }
                                    console.log("Error from resizing files", err);
                                });
                        })

                    });

                    // x_small - 216 * 144
                    const xSmallImage = await new Promise((resolve, reject) => {
                        files && files.length > 0 && files.map((item, index) => {
                            sharp(files[index].path)
                                .rotate()
                                .resize(216, null)
                                //.crop(sharp.strategy.entropy)
                                .toFile(fileuploadDir + 'x_small_' + files[index].filename, function (err) {
                                    if (files) {
                                        resolve(files)
                                    } else {
                                        reject(error)
                                    }
                                    console.log("Error from resizing files", err);
                                });
                        })
                    });

                    // x_medium - 450 * 300  
                    const mediumImage = await new Promise((resolve, reject) => {
                        files && files.length > 0 && files.map((item, index) => {
                            sharp(files[index].path)
                                .rotate()
                                .resize(450, null)
                                //.crop(sharp.strategy.entropy)
                                .toFile(fileuploadDir + 'x_medium_' + files[index].filename, function (err) {
                                    if (files) {
                                        resolve(files)
                                    } else {
                                        reject(error)
                                    }
                                    console.log("Error from resizing files", err);
                                });
                        })
                    });

                    // x_large - 900 * 650
                    const largeImage = await new Promise((resolve, reject) => {
                        files && files.length > 0 && files.map((item, index) => {
                            sharp(files[index].path)
                                .rotate()
                                .resize(900, null)
                                //.crop(sharp.strategy.entropy)
                                .toFile(fileuploadDir + 'x_large_' + files[index].filename, function (err) {
                                    if (files) {
                                        resolve(files)
                                    } else {
                                        reject(error)
                                    }
                                    console.log("Error from resizing files", err);
                                });
                        })
                    });

                    // xx_large - 1280 * 960
                    const largeImageSize = await new Promise((resolve, reject) => {
                        files && files.length > 0 && files.map((item, index) => {
                            sharp(files[index].path)
                                .rotate()
                                .resize(1280, null)
                                //.crop(sharp.strategy.entropy)
                                .toFile(fileuploadDir + 'xx_large_' + files[index].filename, function (err) {
                                    if (files) {
                                        resolve(files)
                                    } else {
                                        reject(error)
                                    }
                                    console.log("Error from resizing files", err);
                                });
                        })
                    });

                    if (files) {
                        let where = {
                            id: listId,
                        }
                        const isListingAvailable = await Listing.findOne({ where });

                        if (isListingAvailable) {

                            // Create a new record for a photo
                            await Promise.all(files.map(async (item) => {
                                const createPhoto = await ListPhotos.create({
                                    listId: listId,
                                    name: item.filename,
                                    type: item.mimetype
                                }).then(getPhoto => {
                                    item.id = getPhoto.dataValues.id;
                                });
                            }));


                            const photosCount = await ListPhotos.count({ where: { listId } });
                            const steps = await UserListingSteps.findOne({ where: { listId } });

                            if (photosCount > 0 && steps.step3 === 'completed') {
                                const updateListingStatus = await Listing.update({
                                    isReady: true
                                }, {
                                        where: { id: listId }
                                    });
                            }

                            res.send({ status, files });

                        } else {
                            status = 400;
                            errorMessage = 'Listing is not available';
                            res.send({ status, errorMessage });
                        }
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



};

export default uploadListPhotoMobile;
