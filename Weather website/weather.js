const apiKey = "1a755a11225414fd08eb99fcb0a8eaed";
let city = "",
  weatherData = "",
  temp = "",
  humidity = "",
  visibility = "",
  imageID = "",
  imgSrc = "",
  lat = "",
  lon = "";
let weekday = [
  "Sunday",
   "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  
];
function display() {
  getData();
  let cityName = document.querySelector(".city-name");
  city = city.charAt(0).toUpperCase() + city.slice(1);
  cityName.innerHTML = city;

  let image = document.querySelector(".weather-image");
  image.src = imgSrc;
  image.style.display = "inline";
  let day = document.querySelector(".day");
  let tod = new Date();
  today = tod.getDay();
  day.innerHTML = "Day: " + weekday[today];
  let cityTemp = document.querySelector(".city-temp");
  cityTemp.innerHTML = "Temp: " + temp + "&#xb0; Celsius";
  let cityHumidity = document.querySelector(".city-humidity");
  cityHumidity.innerHTML = "Humidity: " + humidity;
  let cityVisibility = document.querySelector(".city-visibility");
  cityVisibility.innerHTML = "Visibility: " + visibility;

  weeksWeather();
}

function getData() {
  city = document.getElementById("city").value;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  httpGetAsync(url, function (response) {
    weatherData = JSON.parse(response);
    // console.log(weatherData);
    lon = weatherData.coord.lon;
    lat = weatherData.coord.lat;
    temp = weatherData.main.temp;
    humidity = weatherData.main.humidity;
    visibility = weatherData.visibility;
    imageID = weatherData.weather[0].icon;
    imgSrc = "https://openweathermap.org/img/w/" + imageID + ".png";
  });
}
function weeksWeather() {
    let ele = document.querySelector(".weeks-weather");
    ele.innerHTML="";
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,alerts,hourly&units=metric&appid=" +
    apiKey;
  //   console.log(url);
  httpGetAsync(url, function (response) {
    //   console.log(response);
    response = JSON.parse(response);
    let value = 12;
    let print = false;
    response.daily.forEach((value, index) => {
      var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
      if (dayname == "Monday" && print == false) {
        //   console.log(dayname);
        print = true;
      }

      // *************Creating cards for weekday*************
      if (print == true && index < 7) {
        var data = document.createElement("div");
        data.className = "week-weather-container";
        let h2 = document.createElement("h2");
        h2.className = "week-name";
        h2.innerHTML = dayname;
        data.appendChild(h2);
        let img = document.createElement("img");
        img.className="week-image";
        img.src =
          "https://openweathermap.org/img/w/" + value.weather[0].icon + ".png";
        data.appendChild(img);
        let h3 = document.createElement("h3");
        h3.className = "week-temp";
        h3.innerHTML = value.temp.day+ "&#xb0; Celsius";
        data.appendChild(h3);
        let ele = document.querySelector(".weeks-weather");
        ele.appendChild(data);
      }
    });
  });
}
function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, false); // true for asynchronous
  xmlHttp.send(null);
}