// GLOBAL VARS
var PassedlocationName = "";
var client = new MapboxClient(
  "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
);


function getGeoLocation(userEnteredLocation, cb) {
  // Format userEnteredLocation for use in Mapbox
  var formattedLocation = userEnteredLocation.split(" ").join("+");

  // Log formattedLocation
  console.log(formattedLocation);

  // call Mapbox geocode function
  client.geocodeForward(formattedLocation, function(err, data, res) {

    // Get latitude and longitude from response
    var lat = data.features[0].geometry.coordinates[0];
    var long = data.features[0].geometry.coordinates[1];

    // Error handling
    if (err) {
      return console.log("Error occurred: " + err);
      alert('sorry this location did not compute. Try again');
    }

    // Return lat and long to callback function
    return cb(lat, long);
  });
}

function mapPoints(typeOfMap, userEmail) {
  $("#map-container").empty();
  $("#map-container").append("<div id='map'</div>");
  switch(typeOfMap) {
    // If typeOfMap is all
    case "all":
      // Route is for all issues
      var route = "/api/issues";
      break;
    // If typeOfMap is mine
    case "mine":
      // Route is for userEmail
      var route = "/api/issues/userEmail/" + userEmail;
      break;
    // If typeOfMap is new
    case "new":
      // Route is for new
      var route = "/api/issues/status/new"
      break;
  }

  // Make appropriate AJAX request
  $.ajax(route, {
    type: "GET"
  }).then(function(res) {
    // Empty array to hold map point data
    var points = [];
    // Create map via leaflet.js
    var mymap = L.map("map").setView([38.931, -77.038], 12);
    // choose style of map via mapBox
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A",
        {
          attribution: '<a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken: "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
        }
      ).addTo(mymap);

    //  loop to create a array of data points to drop into map
    for (let i = 0; i < res.length; i++) {
      var parsedTitle = res[i].title;
      var allpoints = [`${parsedTitle}` , parseFloat(res[i].lon) , parseFloat(res[i].lat) ];
      // push all the points from database into map.
      points.push(allpoints);
    }

   //  Loop through array of points to drop onto map.
    for (var i = 0; i < points.length; i++) {
     var marker = new L.marker([points[i][1],points[i][2]])
       .bindPopup(points[i][0])
       .addTo(mymap);
     }
  });
}
