$(document).ready(function() {
  Weather.getLocation();
  $("#units-toggle").on("click", Weather.toggleUnits);
});

Weather = {};

// State
// Undefined unnecessary but it conveys information on the Weather object;
Weather.baseApiUrl = "http://api.openweathermap.org/data/2.5/weather?";
Weather.apiKey = "339bc502e738a05e187a870b4780626d";
Weather.units = 'imperial';
Weather.lat = undefined;
Weather.lon = undefined;
Weather.icon = undefined;
Weather.id = undefined;
Weather.temperature = undefined;
Weather.windSpeed = undefined;
Weather.backGroundImgs = {
  "rain": "http://3.bp.blogspot.com/-RMsM5dCEttM/VogjQTtm9rI/AAAAAAAAAwE/MeyKTzXXhGE/s1600/rain.jpg",
  "snow": "https://3.bp.blogspot.com/-R0KK77Z_RUM/VogkdOX7EAI/AAAAAAAAAwQ/DN7KkdJQHmA/s1600/stockvault-winters-tale102834.jpg",
  "sunny": "http://4.bp.blogspot.com/-rgunM2dAF7U/VoglacGCWBI/AAAAAAAAAwc/_IS0HxFL0Lw/s1600/sunny-day.jpg"
};

// functions
Weather.getLocation = function() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      Weather.lon = position.coords.longitude;
      Weather.lat = position.coords.latitude;
      Weather.getWeather();
    });
  } else {
    Weather.displayError();
  }
};
Weather.getWeather = function() {
  var options = {
    url: Weather.fullApiUrl(),
    type: "GET",
  };

  $.ajax(options)
    .done(function(data) {
      Weather.setData(data);
      Weather.displayData();
  })
  .fail(function(data) {
    console.log("ajax request failed");
  });
};
Weather.fullApiUrl = function() {
  return Weather.baseApiUrl + 'lat=' + Weather.lat + '&lon=' + Weather.lon +
    '&APPID=' + Weather.apiKey + '&units=' + Weather.units;
};
Weather.displayError = function() {
  $('.aux-info').remove();
  $('.main-info').html('<h1 class="text-center">Your Browser Does Not Support Geolocation</h1>');
};
Weather.setData = function(data) {
  Weather.icon = data.weather[0].icon;
  Weather.temperature = data.main.temp;
  Weather.windSpeed = data.wind.speed;
  Weather.id = data.weather[0].id;
};
Weather.displayData = function() {
  Weather.displayIcon();
  Weather.displayTemp();
  Weather.displayWindSpeed();
  Weather.changeBackground();
};
Weather.displayIcon = function() {
  $('#weather-icon').attr('src', Weather.iconURL)
};
Weather.iconURL = function() {
  return 'http://openweathermap.org/img/w/' + Weather.icon + '.png';
};
Weather.displayTemp = function() {
  var temp = Weather.temperature;

  if (Weather.units === 'imperial') {
    temp += " F";
  } else {
    temp += " C";
  }
  $('#temperature').text(temp);
};
Weather.displayWindSpeed = function() {
  var windSpeed = Weather.windSpeed;

  if (Weather.units === 'imperial') {
    var windUnit = "MPH";
  } else {
    var windUnit = "Meters / Sec";
  }

  $('#wind-speed').text(windSpeed);
  $('#wind-unit').text(windUnit);
};
Weather.toggleUnits = function() {
  if (Weather.units === 'metric') {
    Weather.units = 'imperial';
  } else {
    Weather.units = 'metric';
  }

  Weather.changeButtonText();
  Weather.getWeather();
};
Weather.changeButtonText = function() {
  var newText = "Switch to ";

  if (Weather.units === 'imperial') {
    newText += "Metric";
  } else {
    newText += "Imperial";
  }

  $('#units-toggle').text(newText);
}
Weather.changeBackground = function() {
  if (Weather.id >= 200 && Weather.id < 600) {
    $('body').css('background', 'url(' + Weather.backGroundImgs.rain + ')');
  } else if (Weather.id >= 600 && Weather.id < 700) {
    $('body').css('background', 'url(' + Weather.backGroundImgs.snow + ')');
  } else {
    $('body').css('background', 'url(' + Weather.backGroundImgs.sunny + ')');
  }
}
