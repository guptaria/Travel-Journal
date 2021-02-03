
// var UserId = document.cookie;
//   console.log(UserId);

// $(document).ready(function () {
//   var h3 = $(".titleThis");
//   var h4 = $("<h4>");
//   var img = $("<img>");
//   var paragraph = $(".paragraph");

//   // Gets post data for a post if we're editing
//   function getJournalData(UserId) {
//     $.get("/api/userPage/" + UserId, function (data) {
//       alert('this is running')
//       console.log(data);
//       h3.text(data.journalTitle);
//       if (data) {
//         // If this post exists, prefill our cms forms with its data
//         paragraph.text(data.journalEntry);
//         // postCategorySelect.val(data.location);
//         h4.text(data.start_date);
//         // If we have a post with this id, set a flag for us to know to update the post
//         // when we hit submit
//                 // updating = true;
//       }
//     });
//   }
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


  
// $(document).ready(function(){
//    $('p').hide();
//    $('h3').click(function (){
//        $('p').hide();
//        $(this).parent().children('p').toggle();
//      });

//    $('.journalButtons').hide();
//    $('h3').click(function (){
//        $('.journalButtons').hide();
//        $(this).parent().children('.journalButtons').toggle();
//      });

//     //  $('h3').click(function (){
//     //      $('p').toggle();
//     //  });
//    });

      