$(document).ready(() => {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
  
    $("#signout-container").hide();
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", event => {
      event.preventDefault();
      const userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      })
        .then(() => {
          window.location.replace("/members");
          // If there's an error, log the error
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
  
  // eslint-disable-next-line prettier/prettier
  function onSignIn(googleUser) { // eslint-disable-line no-unused-vars
    const profile = googleUser.getBasicProfile();
    $("#signout-container").show();
    // $("#signout-button").hide();
  
    $("#signin-container").hide();
    $("#loggedUserImage").attr("src", profile.getImageUrl());
    $("#loggedUsername").html(profile.getName());
    $("#loggedUserEmail").html(profile.getEmail());
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  
    let googleEmail = profile.getEmail();
    postFromGoogle(googleEmail);
  }
  
  function postFromGoogle(googleEmail) {
  console.log(googleEmail);
  
    $.post("/api/glogin", {
      email: googleEmail
      // password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
  // eslint-disable-next-line prettier/prettier
  function signOut() { // eslint-disable-line no-unused-vars
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log("User signed out.");
      $("#signout-container").hide();
      $("#signin-container").show();
    });
  }
  