// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page


    if (req.user) {
      res.redirect("/home");
    }
    // res.sendFile(path.join(__dirname, "../public/sign-up.html"));
    res.sendFile(path.join(__dirname, "../public/google-signup.html"));
    //res.sendFile(path.join(__dirname, "../public/home.html"));
    // res.sendFile(path.join(__dirname, "../public/user_journal.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page


    if (req.user) {
      res.redirect("/explore");
    }
    // res.sendFile(path.join(__dirname, "../public/log-in.html"));
    res.sendFile(path.join(__dirname, "../public/google-login.html"));
  });


  app.get("/sign-up", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/home.html");
    // }
    // res.sendFile(path.join(__dirname, "../public/log-in.html"));
    res.sendFile(path.join(__dirname, "../public/sign-up.html"));
  });

  //Here we've add our isAuthenticated middleware to this route.
  //If a user who is not logged in tries to access this route they will be redirected to the signup page

//   app.get("/home", function(req, res) {
//     // If the user already has an account send them to the google-login page
   
//     // res.sendFile(path.join(__dirname, "../public/log-in.html"));
//     res.sendFile(path.join(__dirname, "../public/user-home.html"));
//   });
//   app.get("/journal", function(req, res) {
//     // If the user already has an account send them to the google-login page
   
//     // res.sendFile(path.join(__dirname, "../public/log-in.html"));
//     res.sendFile(path.join(__dirname, "../public/user-journal.html"));
//   });
//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page

  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });


  // Route to explore page
  app.get("/explore", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-home.html"));
  });
  
  //routes to primary dashboard user page
  app.get("/my-journals", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main-journal.html"));
  });

  // Routes to add a new journal
  app.get("/journal-entry", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user_journal.html"));
  });

};


