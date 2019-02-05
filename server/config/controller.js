// ./app/controller.js
// Dependencies
var cloudinary = require('cloudinary');
// Mongoose Model
var Model = require('./models/team');

// Configure Cloudinary
// with credentials available on
// your Cloudinary account dashboard
cloudinary.config({
    cloud_name: 'statcaster',
    api_key: '485928331949434',
    api_secret: '6qkG40S3yASDaz3BdimgYYZj4Co'
});

module.exports = {
  new: function (req, res) {
      res.render('pages/new');
  },
  create: function (req, res) {
      // Use Cloudinary uploader to upload to cloudinary sever
      // Access files uploaded from the browser using req.files
      cloudinary.uploader.upload(req.files.image.path, function(result) {
          // Create a post model
          // by assembling all data as object
          // and passing to Model instance
          var post = new Model({
              title: req.body.title,
              description: req.body.description,
              created_at: new Date(),
              // Store the URL in a DB for future use
              image: result.url
              image_id: result.public_id
          });
          // Persist by saving
          post.save(function (err) {
              if(err){
                  res.send(err)
              }
              // Redirect
              res.redirect('/');
          });
      });
  }
};
