$(document).ready(function() {
  //////////////////////////////
  ////// GLOBAL VARIABLES //////
  //////////////////////////////

  // Cloudinary Variables
  var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/spiffy-plus/upload";
  var CLOUDINARY_UPLOAD_PRESET = "prdda0cv";
  // Default image (i.e. for when user doesn't upload an image)
  var SPIFFY_LOGO_URL = "http://res.cloudinary.com/spiffy-plus/image/upload/v1521299063/spiffy-temp-logo.png";

  // Variables for uploading images from form
  // These have to be global since we're separating the Choose File button from the upload action
  var imageToUpload;
  var formData;

  ////////////////////////////
  ////// EVENT HANDLERS //////
  ////////////////////////////

  // When the user selects an image using the Choose File button (triggers a change)
  $("#userImg").on("change", function() {
    // Store the file object in imageToUpload
    imageToUpload = $(this)[0].files[0];

    // Construct FormData object
    formData = new FormData();
    formData.append("file", imageToUpload);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  });

  // When the user clicks the upload button
  $("#submit-new-issue").on("click", function(e) {
    // Prevent default
    e.preventDefault();

    // If no image is provided
    if (!imageToUpload) {
      // Call sendTweet with default image
      sendTweet(SPIFFY_LOGO_URL);
    } else {
      // Otherwise the user uploaded an image
      // Make an AJAX POST request to Cloudinary
      $.ajax({
        url: CLOUDINARY_URL,
        data: formData,
        type: "POST",
        contentType: false,
        processData: false
      }).then(function(cloudinaryRes) {
        // Call sendTweet function and pass image url
        sendTweet(cloudinaryRes.url);
      }).catch(function(cloudinaryErr) {
        // Error handling
        console.error(cloudinaryErr);
      });
    }
  });
});

function sendTweet(imageUrl) {
  // Set up Codebird
  var cb = new Codebird();
  cb.setConsumerKey("fBm9xMcWCrSIzi4sjqC9mCI9T", "awCSRWNXzqCl1Rz3k5fvZl5XyKOwAX4PE7tVthASHjGm52OqOg");
  cb.setToken("973723797613367298-sBw6uEPUauV5v2ceKQYlvuZofplRlYu", "knYbR6dulgqloyYCwxZtd6BeSuesb3DbgdsyPQwsKaKBu");
  // Grab pertinent information from form
  var tweetTitle = $("#userProjectName").val().trim();
  var tweetLocation = $("#user-location").val().trim();
  var tweetType = $("#userProjectType").val().trim().toLowerCase();
  // Create message
  var params = {
    status: `We just received a new ${tweetType} request! Here's the info:\nTitle: ${tweetTitle}\nLocation: ${tweetLocation}\nImage: ${imageUrl}`
  };
  // Post message
  cb.__call("statuses_update", params, function(reply, rate, err) {
      // call postNewProject and pass imageUrl and tweetUrl as args
      postNewProject(imageUrl, reply.id_str);
    });
}

function postNewProject(imgUrl, twitterUrl){
  var newProject = {
    title: $("#userProjectName").val().trim(),
    location: $("#user-location").val().trim(),
    projectType:$("#userProjectType").val().trim(),
    imglocation: imgUrl,
    tweetURL: twitterUrl
  }
  console.log(newProject);
  $.ajax("/api/issues", {
    data: newProject,
    type: "POST"
  }).then(function(){
    console.log("new project added");
    // location.reload();
  })
}
