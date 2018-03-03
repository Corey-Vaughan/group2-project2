//Return location
function updateLocation(){
  return $("#location").val();
};

//attractions
$("#search").click(function(){
  var location = updateLocation();
  console.log("hello");
  
  console.log(location);
  

  $("#map").append("<iframe width='450' height='250' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?key=AIzaSyBSVxSYNn2ECShvYyJP-SLsWysekOZygSE&q=attractions+"+location+"'  allowfullscreen></iframe>")

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
function getRecipient(){
  return $("#bookit").attr("data-name")
}

  $('#bookit').click(function (event) {
  var button = $(this); // Button that triggered the modal#
  var recipient = getRecipient();
  var emailTitle =  $('"[name="start-date"') + " - " +$('"[name="end-date"');
  console.log(emailTitle);
  console.log(recipient);
   // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $("#bookIt");
  modal.find('#uniqueId').text('New message to ' + recipient)
  modal.find('#title-text').text(emailTitle)
  modal.find('.modal-body input').val(recipient)
})