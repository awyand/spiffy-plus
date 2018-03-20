// GLOBAL VARS
var PassedlocationName = "";
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
