import { documentuploadDir } from '../config';
import multer from 'multer';
const crypto = require('crypto');
const fs = require('fs');
const fse = require('fs-extra');
import bodyParser from 'body-parser';
import sharp from 'sharp';


var storage = multer.diskStorage({
  destination: documentuploadDir,
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

        case 'application/pdf':
          ext = '.pdf';
          break;
      }

      cb(null, raw.toString('hex') + ext);
    })
  }
});

var upload = multer({ storage: storage });

function removeFile(fileName, filePath) {

  if (fs.existsSync(filePath + fileName)) {
    // Original
    fs.unlink(filePath + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }
}

const documentUpload = app => {

  app.post('/documents', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, upload.array('file'), async (req, res, next) => {
    let files = req.files;

    res.send({ status: 'SuccessFully uploaded!', files });

  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/deleteDocuments', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = documentuploadDir;
    let fileName = req.body.fileName;
    await removeFile(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });

  app.post('/removeMultiFiles', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    var files = req.body.files;
    let filePath = documentuploadDir;
    if (files != undefined && files.length > 0) {
      files.map(async function (item) {
        await removeFiles(item.name, filePath);
      });
      res.send({ status: 'SuccessFully removed!' });
    }
    res.send({ status: 'No files to remove' });
  });

};

export default documentUpload;
