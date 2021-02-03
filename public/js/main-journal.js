// var UserId = document.cookie;
//   console.log(UserId);

$(document).ready(function () {
  
  const journalSection = $(`section.Journal`);

  // Gets post data for a post if we're editing
  function getJournalData(UserId) {
    $.get("/api/userJournalPage/" + UserId, function (data) {
      console.log(data);
      if (data) {

        data.forEach(function (entry) {

          const mainEntry = $(`<div class="entry">`);
          mainEntry.data("UserId", entry.UserId);

          const h3 = $(`<h3>`);
          h3.text(entry.journalTitle);

          const h4 = $(`<h4>`);
          h4.text(entry.start_date);

          const img = $(`<img>`);
          img.attr(`src`, `./img/mexicocity.jpg`);

          const paragraph = $(`<p class="paragraph">`);
          paragraph.text(entry.journalEntry);
          
          const journalButtons = $(`<div class="journalButtons">`);
          const editButton = $(`<button class="editEntry">Edit</button>`);
          editButton.data("UserId", entry.UserId);
              
          const deleteButton = $(`<button class="deleteEntry">Delete</button>`);
          deleteButton.data("UserId", entry.UserId);
          journalButtons.append(editButton, deleteButton);

          mainEntry.append(h3, h4, img, paragraph, journalButtons);

          journalSection.append(mainEntry);
        });




        // If this post exists, prefill our cms forms with its data
        // postCategorySelect.val(data.location);
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
  