// dependencies
var importKeys = require("./keys");
var MapboxClient = require("mapbox");
var GeoJSON = require('geojson');
// var mapBoxKey = new MapboxClient(importKeys.mapbox);

var client = new MapboxClient(
  "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
);
// var to hold user entered location
var location = "1225 9th Street Northwest, Washington, District of Columbia";
// Splice the location into a format that agrees with geocode
var formattedLocation = location.split(" ").join("+");
console.log(formattedLocation);

var locationPoints = {
    type: "FeatureCollection",
    features:['stuff']
    
}

var passedLocation;

client.geocodeForward(location, function(err, data, res) {
  // data is the geocoding result as parsed JSON

  // return long/lat based on address
  // passedLocation = data.features[1].geometry.coordinates;

  // This specifies only the feature object
  passedLocation = data.features[1];

    console.log(locationPoints.features);


    // Create an function to push each entered address to the array

    //  Create constuctor with data to plug into variable to be converted to geojson


  if (err) {
    return console.log("Error occurred: " + err);
  }
});

  function UserMapPoint(projectName, projectLocation, projectType, lat, lng ){
        this.project_name = projectName;
        this.project_location = projectLocation;
        this.project_type = projectType;
        this.lat = lat;
        this.lng = lng;
    }

// geojason conversion
// var locationData = [
//     { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
//     { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
//     { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
//   ];


//   GeoJSON.parse(locationData, {Point: ['lat', 'lng']});