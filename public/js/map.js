// GLOBAL VARS
var PassedlocationName = "";

var geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.042941, 38.985874]
      },
      properties: {
        title: "Zip: 20012",
        description: "Washington, D.C."
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.019023, 38.912068]
      },
      properties: {
        title: "Zip: 20001",
        description: "Washington, DC"
      }
    }
  ]
};
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

  geojson.features.forEach(function(marker) {
    // create a HTML element for each feature
    var el = document.createElement("div");
    el.className = "marker";

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)

      // add popup

      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            "<h4>" +
              marker.properties.title +
              "</h4><p>" +
              marker.properties.description +
              "</p>"
          )
      )
      .addTo(map);
  });
}

createMap();

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
