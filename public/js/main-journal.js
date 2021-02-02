//Toggle on Journal Entry//



// $(document).ready(function() {
//     $('#entry').on('click', function() {
//         $('.show-description').toggleClass('.show-description');
//     });
// });


// $('#entry').hide();

// $(document).ready(function() {
//     $('.entry').on('click', function() {
//         $(this).toggle();
//     });
// };

// $(document).ready(function() {
//     $('p').hide();
// });

// let ...  = 

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
   

//     // Our initial todos array
//   var todos = [];

//   // Getting todos from database when page loads
//   getTodos();

 

// Gets post data for a post if we're editing
  function getJournalData(id) {
    $.get("/api/userJournalPage/" + id, function(data) {
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

   // This function constructs a todo-item row
//    function createNewRow(todo) {
//     var $newInputRow = $(
//       [
//         "<li class='list-group-item todo-item'>",
//         "<span>",
//         todo.text,
//         "</span>",
//         "<input type='text' class='edit' style='display: none;'>",
//         "<button class='delete btn btn-danger'>x</button>",
//         "<button class='complete btn btn-primary'>✓</button>",
//         "</li>"
//       ].join("")
//     );

//     $newInputRow.find("button.delete").data("id", todo.id);
//     $newInputRow.find("input.edit").css("display", "none");
//     $newInputRow.data("todo", todo);
//     if (todo.complete) {
//       $newInputRow.find("span").css("text-decoration", "line-through");
//     }
//     return $newInputRow;
//   }

  // This function inserts a new todo into our database and then updates the view
//   function insertTodo(event) {
//     event.preventDefault();
//     var todo = {
//       text: $newItemInput.val().trim(),
//       complete: false
//     };

//     $.post("/api/todos", todo, getTodos);
//     $newItemInput.val("");
//   }

  // This function deletes a todo when the user clicks the delete button
//   function deleteTodo(event) {
//     event.stopPropagation();
//     var id = $(this).data("id");
//     $.ajax({
//       method: "DELETE",
//       url: "/api/todos/" + id
//     }).then(getTodos);
//   }

  // This function handles showing the input box for a user to edit a todo
//   function editTodo() {
//     var currentTodo = $(this).data("todo");
//     $(this).children().hide();
//     $(this).children("input.edit").val(currentTodo.text);
//     $(this).children("input.edit").show();
//     $(this).children("input.edit").focus();
//   }

  // Toggles complete status
//   function toggleComplete(event) {
//     event.stopPropagation();
//     var todo = $(this).parent().data("todo");
//     todo.complete = !todo.complete;
//     updateTodo(todo);
//   }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
//   function finishEdit(event) {
//     var updatedTodo = $(this).data("todo");
//     if (event.which === 13) {
//       updatedTodo.text = $(this).children("input").val().trim();
//       $(this).blur();
//       updateTodo(updatedTodo);
//     }
//   }

  // This function updates a todo in our database
//   function updateTodo(todo) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/todos",
//       data: todo
//     }).then(getTodos);
//   }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
//   function cancelEdit() {
//     var currentTodo = $(this).data("todo");
//     if (currentTodo) {
//       $(this).children().hide();
//       $(this).children("input.edit").val(currentTodo.text);
//       $(this).children("span").show();
//       $(this).children("button").show();
//     }
//   }

getJournalData(1);
});


