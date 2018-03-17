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
