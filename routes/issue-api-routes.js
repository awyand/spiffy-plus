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
            res.render("index"), { issue: dbIssue }
        });
    });

}