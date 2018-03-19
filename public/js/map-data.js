

// //////////////////////////////
//     ////// Dependencies//////
//     //////////////////////////////
// var importKeys = require("./keys");
// var MapboxClient = require("mapbox");
// var GeoJSON = require('geojson');
// // var mapBoxKey = new MapboxClient(importKeys.mapbox);

// var client = new MapboxClient(
//   "pk.eyJ1IjoiaGVucnloYW5rZGMiLCJhIjoiY2plcmF4YXkwMHQxbTJ3bXV2cG9kNjY3NCJ9.nR_dD4v96HlpfLDnjcim-A"
// );

// //////////////////////////////
//     ////// GLOBAL VARIABLES //////
//     //////////////////////////////

// // var to hold user entered location (this will need to come from the form submission)
// // var location = "1225 9th Street Northwest, Washington, District of Columbia";


// // Splice the location into a format that agrees with geocode
// // var formattedLocation = location.split(" ").join("+");
// // console.log(formattedLocation);

// // Empty variable to hold location data
// var passedLocation;


// // STEPS For User Submission
// // 1. user submits form.
// // 2 location entered get sent to geocode forward to get data object.
// // do you get variable from user entered spot to check data before submitted or
// // take data entered from database?

// // 3. Once returned the location and lat / long get sent to database. lat/long should be one column that includes both.

// // Steps for HP Map
// //1. query database for title and location name and lattitude name
// // 2. create GeoJson to display map points.


// // var userEnteredLocation = 'Fort Stevens, Washington, DC';

// // console.log(userEnteredLocation);

// var testLocation = 'Fort Stevens, Washington, DC';
// console.log(testLocation);
// // var Search = new AddLocationToDb(userEnteredLocation);

// // Search.getGeoLocation();
// // getGeoLocation(testLocation);
// // var apiRoute = `/api/issues/${$(this).attr("data-id")}`;
// // $.ajax("/api/issues", {
// //     data: location,
// //     type: "GET"
// //   }).then(function() {
// //     console.log(data);
// //   });


// function getGeoLocation(userEnteredLocation) {

//         var formattedLocation = userEnteredLocation.split(" ").join("+");
//         client.geocodeForward(formattedLocation, function(err, data, res) {
//             // data is the geocoding result as parsed JSON
//             // return long/lat based on address
//             // passedLocation = data.features[1].geometry.coordinates;
          
//             // This specifies only the feature object
//             // passedLocation = data.features[1];
//             var PassedlocationName = data.features[1].matching_place_name;
//             // add the logged data to a variable that gets exported to the database
//           console.log('The Matching name is' + PassedlocationName);
//         //   console.log(passedLocation);
//         //   console.log(locationName);
          
//           //   console.log(locationPoints.features);
          
          
//             // Create an function to push each entered address to the array
          
//             //  Create constuctor with data to plug into variable to be converted to geojson
//             // var userEnteredData = new UserMapPoint();
          
          
//             if (err) {
//               return console.log("Error occurred: " + err);
//             }
//           });

// }



// module.exports = AddLocationToDb;




// // client.geocodeForward(location, function(err, data, res) {
// //   // data is the geocoding result as parsed JSON

// //   // return long/lat based on address
// //   // passedLocation = data.features[1].geometry.coordinates;

// //   // This specifies only the feature object
// //   passedLocation = data.features[1];
// //   var locationName = data.features[1].matching_place_name;
  

// // console.log(passedLocation);
// // console.log(locationName);

// // //   console.log(locationPoints.features);


// //   // Create an function to push each entered address to the array

// //   //  Create constuctor with data to plug into variable to be converted to geojson
// //   var userEnteredData = new UserMapPoint();


// //   if (err) {
// //     return console.log("Error occurred: " + err);
// //   }
// // });

// // constructor function made up of data that will create geojson

// //   function UserMapPoint(projectName, projectLocation, projectType, lat, lng ){
// //         this.project_name = projectName;
// //         this.project_location = projectLocation;
// //         this.project_type = projectType;
// //         this.lat = lat;
// //         this.lng = lng;
// //     }

// // geojason conversion
// // var locationData = [
// //     { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
// //     { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
// //     { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
// //   ];


// //   GeoJSON.parse(locationData, {Point: ['lat', 'lng']});