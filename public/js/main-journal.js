
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
 
//     $.get("/api/user_data", function (data) {
//       console.log(data);
//       // make sure you are grabbing the correct id from the console log above
//       const UserId = data.UserId;
//       console.log(UserId);
//       // now run the call with the userId
//       getJournalData(UserId);
//     });
  
// });

//Toggle on Journal Entry//



// $(document).ready(function() {
//     $('#entry').on('click', function() {
//         $('.show-description').toggleClass('.show-description');
//     });
// });


// $('#entry').hide();

// $(document).ready(function(){

//     $("#thailand").click(function(){
//       $('p').toggleClass('paragraph toggle');
//     });
   
//    });

// $(document).ready(function() {
//     $('p').hide();
// });

// let ...  = 

// $(document).ready(function() {
// $('#mexico-city').on('click', function() {

//     $("p").toggleClass();
//     });

// $('.entry').on('click', function() {
//         $("p").toggleClass('paragraph',true);


//     });
// });






  // Getting a reference to the input field where user adds a new todo
  //   
  
$(document).ready(function(){
   $('p').hide();
   $('h3').click(function (){
       $('p').hide();
       $(this).parent().children('p').toggle();
     });

   $('.journalButtons').hide();
   $('h3').click(function (){
       $('.journalButtons').hide();
       $(this).parent().children('.journalButtons').toggle();
     });

    //  $('h3').click(function (){
    //      $('p').toggle();
    //  });
   });

