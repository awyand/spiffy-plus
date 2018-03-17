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

    // Get single issue
    app.get("/api/issues/:id", function(req, res) {
      db.Issue.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(dbIssue) {
        res.json(dbIssue);
      });
    });

    app.post("/api/issues", function(req, res) {
      db.Issue.create(req.body).then(function(dbIssue) {
        res.json(dbIssue);
      });
    });

    app.put("/api/issues/:id", function(req, res) {
      db.Issue.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function(dbIssue) {
        db.Issue.findOne({
          where: {
            id: req.params.id
          }
        }).then(function(dbIssue) {
          res.json(dbIssue);
        })
      });
    });
}
