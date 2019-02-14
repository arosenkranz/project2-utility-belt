const cloudinary = require('cloudinary');
const Formidable = require('formidable');
require('dotenv').config();

// tell cloudinary to use your account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
});

// upload image and send nexts part of route
module.exports = function(req, res, next) {
  // create new formidable form
  const form = new Formidable.IncomingForm();

  // since we're uploading an image, use formidable to parse it out and separate files (photos) from fields (text)
  form.parse(req, (err, fields, files) => {
    // if there's a photo, upload it and use it's callback object to get the url
    if (files.photo) {
      cloudinary.uploader.upload(files.photo.path, result => {
        console.log(result);
        // rewrite req.body so it's available in the next set of middleware
        req.body.photo = result.secure_url;
        req.body.title = fields.title;
        req.body.body = fields.body;
        req.body.categoryList = fields.categoryList.split(',');
        req.body.newCategory = fields.newCategory;
        console.log(req.body);
        // send next middleware
        next();
      });
    } else {
      req.body.title = fields.title;
      req.body.body = fields.body;
      req.body.categoryList = fields.categoryList.split(',');
      req.body.newCategory = fields.newCategory;
      next();
    }
  });
};
