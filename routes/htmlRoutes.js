// Require Express
var express = require("express");
// Create router
var htmlRouter = express.Router();

htmlRouter.get("/", function(req, res) {
  // Serve up index
  res.render("index");
});

// Export router
module.exports = htmlRouter;
