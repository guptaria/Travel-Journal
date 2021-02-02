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
