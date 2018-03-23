// GLOBAL VARS
var PassedlocationName = "";

var client = new MapboxClient(
  "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
);

function getGeoLocation(userEnteredLocation, cb) {
  var formattedLocation = userEnteredLocation.split(" ").join("+");
  client.geocodeForward(formattedLocation, function(err, data, res) {
    // data is the geocoding result as parsed JSON
      // console.log(data);
    // Matching geoCode Location
    PassedLocationName = data.features[0].matching_place_name;
    // console.log(PassedLocationName);
  // Retur call back with location name
    return cb(PassedLocationName);

    // add the logged data to a variable that gets exported to the database
    console.log("The Matching name is this in map.js" + PassedLocationName);

    if (err) {
      return console.log("Error occurred: " + err);
      alert('sorry this location did not compute. Try again');
    }
  });
}



// All new leaflet shit

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
              'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox.streets",
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


