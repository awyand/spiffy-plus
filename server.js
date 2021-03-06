// *******************************************************************
// Node/Express Server
// *******************************************************************

// Dependencies
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var handleBars = require("express-handlebars");

// Set up Express including bodyParser and Handlebars
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine("handlebars", handleBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // Route Handling
require("./routes/issue-api-routes.js")(app);

// Database
var db = require("./models");

// Sync sequelize models and start up app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
