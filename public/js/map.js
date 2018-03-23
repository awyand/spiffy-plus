// GLOBAL VARS
var PassedlocationName = "";

// var geojson = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [-77.042941, 38.985874]
//       },
//       properties: {
//         title: "Zip: 20012",
//         description: "Washington, D.C."
//       }
//     },
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [-77.019023, 38.912068]
//       },
//       properties: {
//         title: "Zip: 20001",
//         description: "Washington, DC"
//       }
//     }
//   ]
// };

// console.log(geojson)

function mapPointsNotLoggedIn(){
     // Set API route based on ID
     var apiRoute = `/api/issues/`;

     // AJAX request to get current score and perform appropriate PUT request based on voteType
     // i.e. either increment or decrement current score

     var geojson = {
      type: "FeatureCollection",
      features: []
    };

     $.ajax(apiRoute, {
       type: 'GET'
     }).then(function(res) {
       for (let i = 0; i < res.length; i++) {
        console.log(res[i].lon);

        var parsedLat = parseFloat(res[i].lat);
        var parseLon = parseFloat(res[i].lon);

        var featuresPushed = {
          type:"Feature",
          geometry:{
            type:"Point",
            coordinates:[parsedLat, parseLon]
          },
          properties: {
            title:res[i].title,
            description:res[i].projectType
          }

        };
        geojson.features.push(featuresPushed); 
       }
       console.log(geojson);

     });

}


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

