var MapboxClient = require("mapbox");
var importKeys = require('./keys');
var mapBoxClient = new MapboxClient(importKeys.mapbox);

// Ex:
// var client = new MapboxClient("YOUR_ACCESS_TOKEN");

mapBoxClient.geocodeForward("Washington, DC")
  .then(function(res) {
    // res is the http response, including: status, headers and entity properties
    var data = res.entity; // data is the geocoding result as parsed JSON
  })
  .catch(function(err) {
    // handle errors
  });
