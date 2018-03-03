$(document).ready(function() 
{
/* $(".bookCondo").on("click", function(event) 
  {//book the condo?
    var id = $(this).data("id");
    var updateDevoured = 
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
    );
  });*/

  function appendResultRow(newRow)
  {
    $("#results-dump").append(newRow);
  }

/*  var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) 
        {
          rowsToAdd.push(createResultRow(data[i]));
          console.log(rowsToAdd);
        }
        $("#results-dump").append(rowsToAdd);
      });*/

 function createResultRow(myResult) 
 {
    //var myData = data[i];
    $.ajax(
    {
      method: "POST",
      url: "/api/searchpic",
      data: myResult
    }).then(function(picurl) 
    {
      //console.log(picurl);
      if(picurl.length > 0)
      {
        myResult.picname = picurl[0].name;
      }
      else
      {
        myResult.picname = "/images/cabin.jpg";
      }
      var $newInputRow = $(
        [
          "<li class='list-group-item result-item'>",
          "<span>",
          myResult.name,
          "<img style='border:1px solid gray;width:100px;height:100px; float:right' src=" + myResult.picname +">",
          "<br>location: ",
          myResult.location,
          "<br> price: ",
          myResult.price,
          "<br>Pets OK?: ",
          myResult.pets,
          "<br> Accomodates: ",
          myResult.guests,
          " guests <br><hr> ",
          myResult.description,
          "</span>",
          
          "<button data-name='" + myResult.name + "' class='bookit btn btn-default' style = 'float:right'>BookIt!</button><br><br>",
          "</li><br>"
        ].join(" ")
        );
      //$newInputRow.find("button.bookit").data("name", myResult.name);
      appendResultRow($newInputRow);
    });
  }

// Function for retrieving results and getting them ready to be rendered to the page
  function getResults(search) 
  {
    $.ajax(
    {
      method: "POST",
      url: "/api/search",
      data: search
    }).then(function(data) 
      {
        //console.log(data);
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) 
        {
          createResultRow(data[i]);
        }
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
    getResults(newSearch);
  });

//Return location
function updateLocation(){
  return $("#location").val();
};

//attractions
$("#search").click(function(){
  var location = updateLocation();
  console.log("hello");
  
  console.log(location);
  

  $("#map").empty().append("<iframe width='450' height='250' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?key=AIzaSyBSVxSYNn2ECShvYyJP-SLsWysekOZygSE&q=attractions+"+location+"'  allowfullscreen></iframe>")

  //Weather API

var weatherApiKey = "aea963a5dcfc791987008788dad05046";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + location + ",us&APPID=" + weatherApiKey;

$.ajax({
    url: queryURL,
    data: {
      units: 'imperial'
    },
    method: "GET"
  }).done(function(response){
    console.log(response)
    console.log(response["name"]);

    var weatherDiv = $("<div class = 'weatherWidget'>");
    var cityName = response["name"];
    var temperature = response["main"]["temp"];
    var condition = response["weather"]["0"]["description"];
    var conditionIconCall = response["weather"]['0']["icon"];
    var weatherImgUrl = "http://openweathermap.org/img/w/" + conditionIconCall + ".png";
    var widgetConditionsIcon = $("<img>").attr("src", weatherImgUrl);

    var widgetTemp = $("<p>").html("Currently in " + cityName + ": " + temperature + " \xB0F");
    var widgetConditions = $("<div>").html(widgetConditionsIcon);


    weatherDiv.append(widgetTemp);
    weatherDiv.append(widgetConditions);
    weatherDiv.append(" " + condition)

    $("#weather").html(weatherDiv);
  });
});

  //Modal
/*function getRecipient()
{
  return $(".bookit").attr("data-name")
}*/

$(document).on('click', '.bookit', (function (event) 
{
  //var button = $(this); // Button that triggered the modal#
  var recipient = $(this).attr("data-name");
  console.log(recipient);
   // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $("#bookIt");
  modal.modal();
  modal.find('#uniqueId').text('New message to ' + recipient)
  modal.find('#title-text').text("Please put your travel dates here!")
  modal.find('.modal-body input').val(recipient)
}));




});