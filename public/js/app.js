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
      //Client side form validation:
      //Check to make sure the user is signed in
      if (userEmail === "") {
        $(".error-message").html("Please sign in to add a new project.");
        return;
      }
      //Check to make sure they've entered a project name
      else if ($("#userProjectName").val() === ""){
        $(".error-message").html("Error - please enter a user project name");
        $("#userProjectName").attr("style", "border:1px solid red");
        $("#user-location").attr("style", "border:1px solid #D1D1D1");
        return;
      }
      //Check to make sure they've entered a Location
      else if ($("#user-location").val() === ""){
        $(".error-message").html("Error - please enter a location");
        $("#user-location").attr("style", "border:1px solid red");
        $("#userProjectName").attr("style", "border:1px solid #D1D1D1");
        return;
      } else {
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
    }
    });

    // When user clicks upvote or downvote button
    $(".vote-btn").on("click", function() {
      // Set type of vote (for use during AJAX PUT below)
      var voteType;
      if ($(this).hasClass("upvote-btn")) {
        voteType = "up";
      } else if ($(this).hasClass("downvote-btn")) {
        voteType = "down";
      }

      // Set API route based on ID
      var apiRoute = `/api/issues/${$(this).attr("data-id")}`;

      // AJAX request to get current score and perform appropriate PUT request based on voteType
      // i.e. either increment or decrement current score
      $.ajax(apiRoute, {
        type: "GET"
      }).then(function(res) {
        // Create newScore variable
        var newScore;
        // Create newStatus variable and set it to current status
        var newStatus = res.status;
        // If voteType is up
        if (voteType === "up") {
          // Add one to current score
          newScore = res.score + 1;
          // If current status is New and new score is 5
          if (res.status === "New" && newScore === 5) {
            // Set newStatus to Open
            newStatus = "Open";
            // Send new tweet replying to original tweet
            replyToTweet(res.tweetID, newStatus, res.title);
          }
        } else if (voteType === "down") {
          // Else if voteType is down, subtract one from current score
          newScore = res.score - 1;
        }

        // AJAX PUT request to update score
        $.ajax(apiRoute, {
          data: {
            score: newScore,
            status: newStatus
          },
          type: "PUT"
        }).then(function(updateResponse) {
          // Set element with class issue-score and matching data-id to score from response
          $(`.issue-score[data-id="${updateResponse.id}"]`).text(" " + updateResponse.score);
          // Set element with class issue-status-span and matching data-id to status from response
          $(`.issue-status[data-id="${updateResponse.id}"]`).text(" " + updateResponse.status);
        });
      });
    });

    // Function to handle Close Issue button being clicked
    $(".close-issue-btn").on("click", function(e) {
      // Prevent default
      e.preventDefault();
      // Set API route based on ID
      var apiRoute = `/api/issues/${$(this).attr("data-id")}`;
      // Get issue from db
      $.ajax(apiRoute, {
        type: "GET"
      }).then(function(res) {
        // If status is not closed
        if (res.status !== "Closed") {
          // AJAX PUT request to update status
          $.ajax(apiRoute, {
            data: {
              status: "Closed"
            },
            type: "PUT"
          }).then(function(updateResponse) {
            // Set status on page based on response
            $(`.issue-status[data-id="${updateResponse.id}"]`).text(" " + updateResponse.status);
            // Disable voting buttons
            $(`.vote-btn[data-id=${updateResponse.id}]`).prop("disabled", true);
            // Send update tweet
            replyToTweet(updateResponse.tweetID, "Closed", updateResponse.title);
          });
        } else {
          console.log("Already closed.");
        }
      });
    });


    // Function to send tweet, which takes an image URL as an arg
    function sendTweet(imageUrl) {
      // Set up Codebird
      var cb = new Codebird();
      cb.setConsumerKey("fBm9xMcWCrSIzi4sjqC9mCI9T", "awCSRWNXzqCl1Rz3k5fvZl5XyKOwAX4PE7tVthASHjGm52OqOg");
      cb.setToken("973723797613367298-sBw6uEPUauV5v2ceKQYlvuZofplRlYu", "knYbR6dulgqloyYCwxZtd6BeSuesb3DbgdsyPQwsKaKBu");

      // Grab pertinent information from form
      var tweetInfo = {
        title: $("#userProjectName").val().trim(),
        location: $("#user-location").val().trim(),
        type: $("#userProjectType").val().trim().toLowerCase(),
        username: userName
      };

      // Create message
      var params = {
        status: `We just received a new ${tweetInfo.type} request from ${tweetInfo.username}! Here's the info:\nTitle: ${tweetInfo.title}\nLocation: ${tweetInfo.location}\nImage: ${imageUrl}\nOnce this issue reaches a score of 5, our team of volunteers will start working.  Visit spiffy.plus to vote!`
      };

      // Post message
      cb.__call("statuses_update", params, function(reply, rate, err) {
        // Error handling
        if (err) {
          console.log(err);
        } else {
          // call postNewProject and pass imageUrl and tweetID as args
          postNewProject(imageUrl, reply.id_str);
        }
      });
    }

    // function to reply to a tweet with a status update
    function replyToTweet(originalTweetID, newStatus, issueTitle) {
      // Set up Codebird
      var cb = new Codebird();
      cb.setConsumerKey("fBm9xMcWCrSIzi4sjqC9mCI9T", "awCSRWNXzqCl1Rz3k5fvZl5XyKOwAX4PE7tVthASHjGm52OqOg");
      cb.setToken("973723797613367298-sBw6uEPUauV5v2ceKQYlvuZofplRlYu", "knYbR6dulgqloyYCwxZtd6BeSuesb3DbgdsyPQwsKaKBu");

      // Set update status based on newStatus
      var statusUpdate;
      if (newStatus === "Open") {
        statusUpdate = `Project "${issueTitle}" has received the required number of upvotes and we've changed its status to OPEN.  We're already hard at work and will update you all when this issue has been closed.`;
      } else if (newStatus === "Closed") {
        statusUpdate = `Our volunteers have completed work on project "${issueTitle}" and we are marking it CLOSED. Thanks for the tip, have a spiffy day!`;
      }

      // Create message and point it at originalTweetID
      var params = {
        status: statusUpdate,
        in_reply_to_status_id: originalTweetID
      }

      // Post message
      cb.__call("statuses_update", params, function(reply, rate, err) {
        // Error handling
        if (err) {
          console.log(err);
        } else {
          console.log(reply);
        }
      });
    }

    // Function to post new project to Spiffy API/database
    // Takes image URL and twitter ID as argument
    function postNewProject(imgUrl, twitterID) {
      var newProject = {
        title: $("#userProjectName").val().trim(),
        location: $("#user-location").val().trim(),
        projectType: $("#userProjectType").val().trim(),
        imglocation: imgUrl,
        tweetID: twitterID,
        score: 0,
        userName: userName,
        userEmail: userEmail
      }

      console.log(newProject);

      $.ajax("/api/issues", {
        data: newProject,
        type: "POST"
      }).then(function() {
        console.log("new project added");
      //Show the form sucess Modal
        $("#formSuccess").fadeIn(200);
      });
    }

    //Form Sucess Modal
    $("#back-to-top").on("click", function() {
      $("#formSuccess").attr("style", "display:none");
      location.reload();
    });

    $("#viewOne").on("click", function() {
      $(".issue").empty();
      $.ajax("/api/issues/userEmail/" + userEmail, {
        type: "GET"
      }).then(function(data) {
        console.log(data);
        console.log(data.issue[0].title);
        console.log(data.issue.length);
        for (i = 0; i < data.issue.length; i++) {

          var newIssueDiv = $('<div class="issue">').html(
            '<p class="issue-title">' + data.issue[i].title +
            '</p><p><u>CATEGORY:</u><span class="issue-type" data-id=' + data.issue[i].id + '> ' + data.issue[i].projectType + '</span>' +
            '</p><p><u>LOCATION:</u><span class="issue-location" data-id=' + data.issue[i].id + '> ' + data.issue[i].location + '</span>' +
            '</p><p><u>STATUS:</u><span class=' + data.issue[i].status + ' data-id=' + data.issue[i].id + '> ' + data.issue[i].status + '</span>' +
            '</p><p><u>SCORE:</u><span class="issue-score" data-id=' + data.issue[i].id + '> ' + data.issue[i].score + '</span>' +
            '</p><p><u>DATE ADDED:</u><span class="issue-date" data-id=' + data.issue[i].id + '> ' + data.issue[i].createdAt + '</span>' +
            '</p><img class="issue-img issue-item" src=' + data.issue[i].imglocation +
            '><a class="button twitter-btn" data-id=' + data.issue[i].id + ' href="https://twitter.com/spiffyplus/status/' + data.issue[i].tweetID + ' target="_blank"><i class="fab fa-twitter"></i>&nbsp;View on Twitter' +
            '</a><button type="button" class="close">Close &times;</button>'
          );
          $(".issues").append(newIssueDiv);
        }
      })
    });

    /*Modal Open and Close*/
    /*Open modal*/
    $(document).on('click', '.issue-header', function() {
      $(this).next("div").fadeIn(200);
    });
    /*close modal*/
    $(document).on('click', '.close', function() {
      console.log("close button clicked");
      $('.modal').fadeOut(200);
    });

    // ************************************************************************************************
    // ***************************** GOOGLE AUTHENTICATION ********************************************
    // ************************************************************************************************

    // variables where we will store the users info on log in
    var userName = "";
    var userEmail = "";


    renderButton();

    $(document).on('click', '#signOut-Btn', function() {
      signOut();
    });


    function onSuccess(googleUser) {
      var profile = googleUser.getBasicProfile();
      //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Signed in as ' + profile.getName());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      //console.log('Image URL: ' + profile.getImageUrl());
      userEmail = profile.getEmail();
      userName = profile.getName();
      //If the user is admin (spiffyplus@gmail.com), show the close issue button
      if (userEmail === "spiffyplus@gmail.com"){
        $(".close-issue-btn").attr("style", "display:block");
      }
    };

    function onFailure(error) {
      console.log(error);
    };

    // render google sign in button
    function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    };

    // google sign out function
    function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log('User signed out.');

        userEmail = "";
        userName = "";

        $(".close-issue-btn").attr("style", "display:none");
      });
    }
});
