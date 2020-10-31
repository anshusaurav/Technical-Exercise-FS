// 'use strict'
// const validator = require('express-validation')
require("dotenv").config();
const express = require("express");
const { createValidator } = require('express-joi-validation')
const fileController = require('../../controllers/file.controller')
const validators = require('../../validators/file.validation')
const router = express.Router();
// const File = require("../../models/File");
const validator = createValidator();

// Get all Documents s Routes
router.get("/", fileController.getAll);

// Route to get a single existing GO data (needed for the Edit functionality)
router.get("/:id", fileController.getOne);

// route to upload a pdf document file
// In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
router.post("/", validator.body(validators.create), fileController.upload);
// const file = req.file;
// const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

// let s3bucket = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });

// console.log(process.env.AWS_ACCESS_KEY_ID);
// console.log(process.env.AWS_SECRET_ACCESS_KEY);

// //Where you want to store your file
// // console.log(req.body)
// var params = {
//   Bucket: process.env.AWS_BUCKET_NAME,
//   Key: file.originalname,
//   Body: file.buffer,
//   ContentType: file.mimetype,
//   ACL: "public-read"
// };

// s3bucket.upload(params, function (err, data) {
//   if (err) {
//     res.status(500).json({ error: true, Message: err });
//   } else {
//     res.send({ data });
//     var newFileUploaded = {
//       name: req.body.name,
//       fileLink: s3FileURL + file.originalname,
//       s3_key: params.Key
//     };
//     var document = new DOCUMENT(newFileUploaded);
//     document.save(function (error, newFile) {
//       if (error) {
//         throw error;
//       }
//     });
//   }
// });



module.exports = router;

/* FOR GETTING THE LINK - I COULD USE getSignedUrl like below - with this in the Terminal, I was getting the link of the file, but have to refactor the code to make it fully work with the React frontend.

The getSignedUrl method takes an operations, a params, and a callback function as arguments. The operation argument is a string that specifies the name of the operation to call, in this case 'getObject'. The 'getObject' request from the AWS S3 SDK returns a 'data.Body'. The urlParams are parameters that take the Bucket name and the name of the key, in this case the file name. The callback function takes two arguments, error and url. The url is the string we would want to place in our file linking tag to point to the file in the respective front-end code (In this case my FileUpload.js React Component).

========================
  s3bucket.upload(params, function(err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      var urlParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname
      };
      s3bucket.getSignedUrl("getObject", urlParams, function(err, url) {
        // fileURL = url;
        console.log(fileURL);
        res.send({ data });
      });
      console.log(fileURL);
      var newFileUploaded = {
        description: req.body.description,
        fileLink: fileURL
      };
      var document = new DOCUMENT(newFileUploaded);
      document.save(function(error, newFile) {
        if (error) {
          throw error;
        }
      });
    }
  });
 */
