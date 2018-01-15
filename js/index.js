$(document).ready(function() {
  
  //Get the user's latitude and longitude when the page loads
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function getCoordinates(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      
     /*OLD URL that is no longer supported: weatherApiUrl = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&APPID=166c3ea05be6d2a779ba8a6eb7dba15a";*/
      
      //Built URL to get weather info from API using the coordinates
      var weatherApiUrl = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude;
      
      //Request weather information using the URL
      $.ajax({
          url: weatherApiUrl,
          async: false
        }).then(function getWeatherInfo(json) {
        
          //Get the temperature in Farenheit and Celsius
          var tempF = Math.round(parseInt(json.main.temp) * (9/5) + 32);
          var tempC = Math.round(parseInt(json.main.temp));
          
          //Display the city, temp, and units (default to Farenheit)
          $("#city").html(json.name + ", " + json.sys.country);
          $("#temp").html(tempF);
          $('.units').html("°F");
        
            //If the Farenheit or Celsius link is clicked switch units to the opposite and display new temp/units
            $('.units').click(function() {
              if ($('.units').hasClass('farenheit')) {
                $('#temp').html(tempC);
                $('.units').html("°C");
                $('.units').removeClass('farenheit');
                $('.units').addClass('celsius');
              } else {
                
                $('#temp').html(tempF);
                $('.units').html("°F");
                $('.units').removeClass('celsius');
                $('.units').addClass('farenheit');
              }
            });
        
          //Display the appropriate weather icon
          $("#weather").html('<img src="' + json.weather[0].icon +'">');
        
        });
    }); //End getCoordinates() function

  } 
  
  //If coordinates can't be obtained, show an error message.
  else {
    $("#data").html("Can't find weather.");
  }
});