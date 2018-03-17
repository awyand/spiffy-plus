    // dependencies
  var MapboxClient = require("mapbox");
  var importKeys = require('./keys');
//   var mapBoxClient = new MapboxClient(importKeys.mapbox);

  var client = new MapboxClient(
    "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
  );
  // var to hold user entered location
  var location = '1225 9th Street Northwest, Washington, District of Columbia';
  // Splice the location into a format that agrees with geocode
  var formattedLocation = location.split(' ').join('+');
  console.log(formattedLocation);

  var passedLocation;
  
  client.geocodeForward(location, function(err, data, res) {
    // data is the geocoding result as parsed JSON

    // return long/lat based on address
    // passedLocation = data.features[1].geometry.coordinates;

    // This specifies only the feature object
    passedLocation = data.features[1];

    // Create an function to push each entered address to the array

console.log(passedLocation);
    if (err) {
      return console.log("Error occurred: " + err);
    }
  });

