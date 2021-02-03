// var UserId = document.cookie;
//   console.log(UserId);

$(document).ready(function () {
  var h3 = $(".titleThis");
  var h4 = $("<h4>");
  var img = $("<img>");
  var paragraph = $(".paragraph");

  // Gets post data for a post if we're editing
  function getJournalData(UserId) {
    $.get("/api/userPage/" + UserId, function (data) {
      alert('this is running')
      console.log(data);
      h3.text(data.journalTitle);
      if (data) {
        // If this post exists, prefill our cms forms with its data
        paragraph.text(data.journalEntry);
        // postCategorySelect.val(data.location);
        h4.text(data.start_date);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
                // updating = true;
      }
    });
  }
 
    $.get("/api/user_data", function (data) {
      console.log(data);
      // make sure you are grabbing the correct id from the console log above
      const UserId = data.UserId;
      console.log(UserId);
      // now run the call with the userId
      getJournalData(UserId);
    });
  
});


// make ajax call to the api routes that grabs where userid=1, when they give back response in json obj to the main journal page

// create card and add image 

/* <div class="entry" id="mexico-city">
        <h3>My Love for Mexico City</h3>
        <h4>Date</h4>
            <img src="../public/img/mexicocity.jpg">
            <p class="paragraph"> TESTING.</p>
            <div class="journalButtons">
            <button class="editEntry">Edit</button>
            <button class="deleteEntry">Delete</button>
            </div>
    </div> */

  // Getting a reference to the input field where user adds a new todo
  //   
  