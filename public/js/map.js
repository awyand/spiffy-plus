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
    var lat = data.features[0].geometry.coordinates[1];
    var long = data.features[0].geometry.coordinates[0];

    // Error handling
    if (err) {
      return console.log("Error occurred: " + err);
      alert('sorry this location did not compute. Try again');
    }

    // Return lat and long to callback function
    return cb(lat, long);
  });
}

// All new leaflet shit
// This needs to go into function
// Set API route based on ID
     var apiRoute = `/api/issues/`;

$.ajax(apiRoute, {
         type: 'GET'
       }).then(function(res) {
      
      // Empty array to hold map point data
        var points = []; 

        // Create map via leaflet.js
        var mymap = L.map("map").setView([38.931, -77.038], 12);
      // choose style of map via mapBox
        L.tileLayer(
          "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A",
          {
            attribution:
              '<a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox.comic",
            accessToken:
              "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
          }
        ).addTo(mymap);
       
        //  loop to create a array of data points to drop into map
        for (let i = 0; i < res.length; i++) {
         
          var parsedTitle = res[i].title;
          var allpoints = [`${parsedTitle}` , parseFloat(res[i].lon) , parseFloat(res[i].lat) ];
          // push all the points from database into map.
          points.push(allpoints);

         }
         console.log(points);
        //  Loop through array of points to drop onto map.
         for (var i = 0; i < points.length; i++) {
          marker = new L.marker([points[i][1],points[i][2]])
            .bindPopup(points[i][0])
            .addTo(mymap);
        }
        });


