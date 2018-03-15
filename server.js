// *******************************************************************
// Node/Express Server
// 
// Dookmarriot was here
// 
// *******************************************************************
// Get env file
require("dotenv").config();
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var handleBars = require("express-handlebars");



// Require Directories
var apiRoutes = require('./routes/apiRoutes');
var db = require("./models");


// Express server
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));


// bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Handlebars
app.engine("handlebars", handleBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// **********RENAME THESE AS NECESSARY VVV ********************

// Call Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
