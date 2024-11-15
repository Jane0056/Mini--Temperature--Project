function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let currentCity = document.getElementById("current-city");
let currentTemperatureValue = document.getElementById(
  "current-temperature-value"
);
let currentTemperatureIcon = document.querySelector(
  ".current-temperature-icon"
);

let apiKey = "0c0fc4d0af9a25bbb3ad3644ab6e153c";

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = searchInput.value.trim();

  if (city) {
    fetchCityWeather(city);
  }
});

function fetchCityWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(function (response) {
    let data = response.data;
    let temperature = data.main.temp;

    currentCity.textContent = city;
    currentTemperatureValue.textContent = Math.round(temperature);
  });
}
