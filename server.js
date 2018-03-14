// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Require API routes
var apiRoutes = require('./routes/apiRoutes');

// Express server
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));

// bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// RENAME THESE AS NECESSARY VVV

// Call API Routes and HTML Routes functions
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
