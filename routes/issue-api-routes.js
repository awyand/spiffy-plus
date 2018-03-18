// *******************************************************************
// API Routes
//
// ART3MIS was here
//
// *******************************************************************

var db = require("../models");

// Routes
// ===================================================================
module.exports = function(app) {

    // Serve index.handlebars to the root route
    app.get("/", function(req, res) {
        db.Issue.findAll({}).then(function(dbIssue){
           var allProjectData = {
             issue: dbIssue
           };
          res.render("index", allProjectData);
        });
    });
    
    app.post("/api/issues", function(req, res) {
      db.Issue.create(req.body).then(function(dbIssue) {
        res.json(dbIssue);
      });
    });

    app.get("/api/issues/:userEmail", function(req, res){
      db.Issue.findAll({
        where: {
          userEmail: req.params.userEmail
        }
      }).then(function(dbIssue){
        var userProjectData = {
          issue: dbIssue
        };
        res.json(userProjectData);
      });
    });
}
