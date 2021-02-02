


// $(document).ready(function() {
// $('#mexico-city').on('click', function() {
//     $(this).toggleClass('.paragraph'.hide());
//     });
// });





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

$(document).ready(function() {
    // Getting a reference to the input field where user adds a new todo
//     var $h3 = $("<h3>");
//     var $h4 = $("<h4>");
//     var $img = $("<img>");
//     var $paragraph = $(".paragraph");
   
var UserId = document.cookie;
console.log(UserId);

//     // Our initial todos array
//   var todos = [];

//   // Getting todos from database when page loads
//   getTodos();

 

// Gets post data for a post if we're editing
  function getJournalData(UserId) {
    $.get("/api/userJournalPage/" + UserId, function(data) {
        console.log(data);
      if (data) {
        // If this post exists, prefill our cms forms with its data
        // journal.val(data.journalTitle);
        // bodyInput.val(data.journalEntry);
        // postCategorySelect.val(data.location);
        // postCategorySelect.val(data.start_date);
    
        
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
//         updating = true;
      }
    });
  }

  function getUserData(){
  app.get("/api/user_data", function(data) {
    console.log(data);

    UserId.val(data.UserId);
    // bodyInput.val(data.journalEntry);
    // postCategorySelect.val(data.location);
    // postCategorySelect.val(data.start_date);
      });
    }
  

    // The user is not logged in, send back an empty object
    res.json({});
  });
}
getJournalData(UserId);
});


