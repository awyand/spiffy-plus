// *******************************************************************
// API Routes
// *******************************************************************

// Require Sequelize models
var db = require("../models");

// Routes
// ===================================================================
module.exports = function(app) {

    // GET ROUTES

    // Serve index.handlebars to the root route
    app.get("/", function(req, res) {
      db.Issue.findAll({}).then(function(dbIssue) {
        var allProjectData = {
          issue: dbIssue
        };
        res.render("index", allProjectData);
      });
    });
    //Get all issues for view all button
    app.get("/api/all", function(req, res) {
      db.Issue.findAll({}).then(function(dbIssue) {
        res.json(dbIssue);
      })
    })
    // Get issue by ID
    app.get("/api/issues/:id", function(req, res) {;

      db.Issue.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(dbIssue) {
        res.json(dbIssue);
      });
    });

    // Get issues by user
    app.get("/api/issues/userEmail/:userEmail", function(req, res) {
      db.Issue.findAll({
        where: {
          userEmail: req.params.userEmail
        }
      }).then(function(dbIssue) {
        res.json(dbIssue);
      });
    });

    // POST ROUTES

    // Post new issue
    app.post("/api/issues", function(req, res) {
      db.Issue.create(req.body).then(function(dbIssue) {
        res.json(dbIssue);
      });
    });

    // PUT ROUTES

    // Update issue by ID
    app.put("/api/issues/:id", function(req, res) {
      db.Issue.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function(dbIssue) {
        // Then return updated issue
        db.Issue.findOne({
          where: {
            id: req.params.id
          }
        }).then(function(dbIssue) {
          res.json(dbIssue);
        });
      });
    });


} // end module.export don't delete
