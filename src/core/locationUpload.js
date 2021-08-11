
import { locationuploadDir } from '../config';
import multer from 'multer';
const crypto = require('crypto');
const fs = require('fs');
const fse = require('fs-extra');
import bodyParser from 'body-parser';
import sharp from 'sharp';

var storage = multer.diskStorage({
  destination: locationuploadDir,
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
      console.log(fileName, 'successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'small_' + fileName)) {
    // small
    fs.unlink(filePath + 'small_' + fileName, (err) => {
      if (err) throw err;
      console.log('small_' + fileName, 'successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'medium_' + fileName)) {
    // medium
    fs.unlink(filePath + 'medium_' + fileName, (err) => {
      if (err) throw err;
      console.log('medium_' + fileName, 'successfully deleted');
    });
  }

}

const locationUpload = app => {

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/removeLocationFile', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = locationuploadDir;
    let fileName = req.body.fileName;

    await removeFiles(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });

  app.post('/uploadLocation', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, upload.single('file'), async (req, res, next) => {
    let file = req.file;

    // small - 101 * 67
    const smallImage = await new Promise((resolve, reject) => {
      sharp(file.path)
        .rotate()
        .resize(250, null)
        //.crop(sharp.strategy.entropy)
        .toFile(locationuploadDir + 'small_' + file.filename, function (err) {
          if (file) {
            resolve(file)
          } else {
            reject(error)
          }
          console.log("Error from resizing files", err);
        });
    });

    if (file.mimetype === 'image/jpeg') {
      // x_medium - 450 * 300  
      const mediumImage = await new Promise((resolve, reject) => {
        sharp(file.path)
          .rotate()
          .resize(450, null)
          .jpeg({ quality: 50 })
          //.crop(sharp.strategy.entropy)
          .toFile(locationuploadDir + 'medium_' + file.filename, function (err) {
            if (file) {
              resolve(file)
            } else {
              reject(error)
            }
            console.log("Error from resizing files", err);
          });
      });
    } else if (file.mimetype === 'image/png') {

      // x_medium - 450 * 300  
      const mediumImage = await new Promise((resolve, reject) => {
        sharp(file.path)
          .rotate()
          .resize(450, null)
          .png({ compressionLevel: 5, adaptiveFiltering: true, force: true })
          //.crop(sharp.strategy.entropy)
          .toFile(locationuploadDir + 'medium_' + file.filename, function (err) {
            if (file) {
              resolve(file)
            } else {
              reject(error)
            }
            console.log("Error from resizing files", err);
          });
      });
    }
    res.send({ status: 'SuccessFully uploaded!', file });

  });


};

export default locationUpload;
