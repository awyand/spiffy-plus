// var MapboxClient = require('mapbox');

// add map to screen
function createMap() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v10",
    center: [-77.040615, 38.931188],
    zoom: 11
  });
}

createMap();

var client = new MapboxClient(
  "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
);

function getGeoLocation(userEnteredLocation) {
console.log(client);
  var formattedLocation = userEnteredLocation.split(" ").join("+");
  client.geocodeForward(formattedLocation, function(err, data, res) {
      // data is the geocoding result as parsed JSON
      // return long/lat based on address
      // passedLocation = data.features[1].geometry.coordinates;
    
      // This specifies only the feature object
      // passedLocation = data.features[1];
      var PassedlocationName = data.features[1].matching_place_name;
      // add the logged data to a variable that gets exported to the database
    console.log('The Matching name is' + PassedlocationName);
  //   console.log(passedLocation);
  //   console.log(locationName);
    
    //   console.log(locationPoints.features);
    
    
      // Create an function to push each entered address to the array
    
      //  Create constuctor with data to plug into variable to be converted to geojson
      // var userEnteredData = new UserMapPoint();
    
    
      if (err) {
        return console.log("Error occurred: " + err);
      }
    });

}

// export function getGeoLocation(userEnteredLocation);



