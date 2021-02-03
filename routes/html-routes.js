// Requiring path to so we can use relative routes to our HTML files
var path = require('path');

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    console.log(req.user);
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });


  app.get("/login", function (req, res) {
    // If the user already has an account send them to the google-login page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/google-login.html"));
  });


  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/user-home.html"));
  });

  app.get('/sign-up', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/sign-up.html'));
  });

  app.get('/my-journals', isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, '../public/main-journal.html'));
  });
};

// app.get("/userPage", function(req, res) {
//   // If the user already has an account send them to the google-login page

//   // res.sendFile(path.join(__dirname, "../public/log-in.html"));
//   res.sendFile(path.join(__dirname, "../public/main-journal.html"));
// });
// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
// app.get("/members", isAuthenticated, function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/members.html"));
// });

// app.get('/logout', (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect('/');
// });


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