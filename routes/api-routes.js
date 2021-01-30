// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

 // Thammarak Try Post Journal
  app.post("/api/location", function(req, res) {
    console.log("req.body = " + req.body);
    console.log("req.body.place = " + req.body.place);
    console.log("req.body.lat = " + req.body.lat);
    console.log("req.body.lang = " + req.body.lang);
    
    db.locations.create({
      place: req.body.place,
      latitude: req.body.lat,
      longitude: req.body.lang
    })
      .then(function(dblocations) {
        // res.redirect(307, "/api/login");
        res.json(dblocations);
      })
      // .catch(function(err) {
      //   res.status(401).json(err);
      // });
  });


//    //GET  route for getting all of the yourJournal
//   app.get("/api/journal/", function(req, res) {
//     db.yourJournal.findAll({})
//       .then(function(dbYourJournal) {
//         res.json(dbYourJournal);
//       });
//   });

// // POST route for saving a new journal
//   app.post("/api/journal", function(req, res) {
//     console.log(req.body);
//     db.yourJournal.create({
//       journalTitle: req.body.journalTitle,
//       journalEntry: req.body.journalEntry,
    
//     })
//       .then(function(dbYourJournal) {
//         res.json(dbYourJournal);
//       });
//   });


  // // Get route for returning yourJournal of a specific category
  // app.get("/api/journal/category/:category", function(req, res) {
  //   db.yourJournal.findAll({
  //     where: {
  //       category: req.params.category
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // // Get route for retrieving a single post
  // app.get("/api/posts/:id", function(req, res) {
  //   db.Post.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  
  // // DELETE route for deleting posts
  // app.delete("/api/posts/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

};


