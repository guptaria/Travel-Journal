// Requiring our models and passport as we've configured it
var db = require("../models/index.js");
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
      password: req.body.password,
      provider: "local"
    })
      .then(function(dbUser) {
        console.log(dbUser);
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/google/login", function(req, res) {

    const userEmail = req.body.email;

    // Validate email
    if(!userEmail) {
      return res.status(401).json({error: "Cannot signup/login due to email NOT found"});
    }

    // Check and see if user already exists
    db.User.findOne({
      where: {
        email: userEmail
      }
    }).then(function(dbUser) {
      console.log(dbUser);
      // If user is already exists then we should just add them to session and redirect to homepage
      if (dbUser) {
        res.cookie.user = {
          UserId: dbUser.id,
          email: dbUser.email,
          userName: dbUser.userName,
          profileImage: dbUser.profileImage
        };
        return res.sendStatus(200);
      }
  
      // No user found with the given email, we need to create new user in our database
      db.User.create({
        UserId: req.body.id,
        email: req.body.email,
        userName: req.body.userName,
        profileImage: req.body.profileImage,
        provider: "google"
      })
      .then(function(dbUser) {
        res.cookie.user = {
          UserId: dbUser.id,
          email: dbUser.email,
          userName: dbUser.userName,
          profileImage: dbUser.profileImage
        };
        res.cookie.user = {
          UserId: dbUser.id,
          email: dbUser.email,
          userName: dbUser.userName,
          profileImage: dbUser.profileImage
        };
        return res.sendStatus(200);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    console.log(req.session);

    if (req.user) {
      return res.json({
        email: req.user.email,
        id: req.user.id
      });
    }

    if(res.cookie.user) {
      return res.json({
        UserId: res.cookie.user.id,
        email: res.cookie.user.email,
        userName: res.cookie.user.userName,
        profileImage: res.cookie.user.profileImage
      });
    }

    // The user is not logged in, send back an empty object
    res.json({});
  });

 // Thammarak Try Post Journal
  app.post("/api/location", function(req, res) {

      console.log("req.body.place = " + req.body.place);
      console.log("req.body.latitude = " + req.body.latitude);
      console.log("req.body.longitude = " + req.body.longitude);
      
    db.userLocation.create({
      place: req.body.place,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    })
      .then(function(dblocations) {
        // console.log(dblocations);
        // res.redirect(307, "/api/login");
        // res.json(dblocations);
      })
      // .catch(function(err) {
      //   res.status(401).json(err);
      // });
  });


  app.post("/api/journal", function(req, res) {

    console.log("req.body.journalTitle = " + req.body.journalTitle);
    console.log("req.body.location = " + req.body.location);
    console.log("req.body.start_date = " + req.body.start_date);
    console.log("req.body.journalEntry = " + req.body.journalEntry);
    
  db.journal.create({
    journalTitle: req.body.journalTitle,
    location: req.body.location,
    start_date: req.body.start_date,
    journalEntry: req.body.journalEntry
  })
    .then(function(dblocations) {
      // console.log(dblocations);
      // res.redirect(307, "/api/login");
      // res.json(dblocations);
    })
    // .catch(function(err) {
    //   res.status(401).json(err);
    // });
});


// GET route for getting all of the userJournalPage
app.get("/api/userJournalPage/:UserId", function(req, res) {
  // findAll returns all entries for a table when used with no options
  db.journal.findAll({
      where: {UserId: req.params.UserId}
  }).then(function(dbUserJournal) {
    // We have access to the todos as an argument inside of the callback function
    res.json(dbUserJournal);
  });
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


