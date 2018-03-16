$(document).ready(function() {
  //////////////////////////////
  ////// GLOBAL VARIABLES //////
  //////////////////////////////

  // Cloudinary Variables
  var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/spiffy-plus/upload";
  var CLOUDINARY_UPLOAD_PRESET = "prdda0cv";

  // Variables for uploading images from form
  // These have to be global since we're separating the Choose File button from the upload action
  var imageToUpload;
  var formData;

  ////////////////////////////
  ////// EVENT HANDLERS //////
  ////////////////////////////

  // When the user selects an image using the Choose File button (triggers a change)
  $("#file-upload").on("change", function() {
    // Store the file object in imageToUpload
    imageToUpload = $(this)[0].files[0];
    // Construct FormData object
    formData = new FormData();
    formData.append("file", imageToUpload);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  });

  // When the user clicks the upload button
  $("#file-upload-button").on("click", function() {
    // If imageToUpload and formData have data
    if (imageToUpload && formData) {
      // Make an AJAX POST request to Cloudinary
      $.ajax({
        url: CLOUDINARY_URL,
        data: formData,
        type: "POST",
        contentType: false,
        processData: false
      }).then(function(cloudinaryRes) {
        // Currently just logging the image's new URL to console
        console.log(cloudinaryRes.url);
        // And then
      }).catch(function(cloudinaryErr) {
        // Error handling
        console.error(cloudinaryErr);
      });
    }
  });
});
