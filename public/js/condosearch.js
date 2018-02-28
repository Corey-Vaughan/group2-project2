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
 function createResultRow(result) {
    var $newInputRow = $(
      [
        "<li class='list-group-item result-item'>",
        "<span>",
        result.location,
        result.price,
        result.pets,
        result.guests,
        result.description
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

// Function for retrieving results and getting them ready to be rendered to the page
  function getResults(search) {
    $.get("/api/search" + search, function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) 
      {
        rowsToAdd.push(createResultRow(data[i]));
      }
      $(".container").append(rowsToAdd);
    });
  }
/*

   //Send the POST request.
   $.get("/api/search", {
      type: "GET",
      data: newSearch
    }).then(getCondos();
  });*/


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
    getResults(newSearch);
  });
});