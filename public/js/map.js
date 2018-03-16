  // dependencies
  var MapboxClient = require("mapbox");
  // var importKeys = require('./keys');
  // var mapBoxClient = new MapboxClient(importKeys.mapbox);

  var client = new MapboxClient(
    "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
  );
  // var to hold user entered location
  var location = 'Washington, DC';
  var passedLocation;

  client.geocodeForward(location, function(err, data, res) {
    // data is the geocoding result as parsed JSON
    // return long/lat based on address
    passedLocation = data.features[1].geometry.coordinates;


    if (err) {
      return console.log("Error occurred: " + err);
    }
  });


  function createMap() {
    // map function will live here
  }