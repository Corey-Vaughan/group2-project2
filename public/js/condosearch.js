$(document).ready(function() 
{
 $(".bookCondo").on("click", function(event) 
  {//book the condo?
    var id = $(this).data("id");
    /*var updateDevoured = 
    {
      devoured: 1,
    };
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, 
    {
      type: "PUT",
      data: updateDevoured
    }).then(
      function() 
      {
        console.log("change devoured to 1");
        // Reload the page to get the updated list
        location.reload();
      }
    );*/
  });


// Function for retrieving results and getting them ready to be rendered to the page
  function getCondos() {
    $.get("/api/authors", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
  }


  $(".search-details").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newSearch = 
    {
      location: $("#location").val().trim(),
      price: $("#price").val().trim(),
      pets: $("#pets").val().trim(),
      guests: $("#guests").val().trim()
    };
    //Send the POST request.
   $.post("/api/search", 
    {
      type: "POST",
      data: newSearch
    }).then(getCondos();
  });
});