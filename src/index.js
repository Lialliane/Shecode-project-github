var key = "051f2c33e4acf0eb6efa3eaab379t3o3";
var city = "Amman";
var url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
axios.get(url).then(getWeather).catch(showError);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  city = city.trim();
  city = city.replace(/[a-zA-Z0-9]+[^_\s-]*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  var url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  console.log(url);
  axios.get(url).then(getWeather).catch(showError);
}
function getWeather(response) {
  if (response.data.status === "not_found") {
    throw error;
  } else {
    let cityElement = document.querySelector("#current-city");
    let tempElement = document.querySelector(".current-temperature-value");
    let iconElement = document.querySelector(".current-temperature-icon");
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(response.data.temperature.current);
    iconElement.src = response.data.condition.icon_url;
  }
}
function showError(error) {
  if (error.code === "ERR_BAD_REQUEST") {
    alert("Sorry something went wrong");
  } else alert("Please enter a valid city");
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
