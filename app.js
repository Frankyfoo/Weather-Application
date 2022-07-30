// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// Selecting elements
const iconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature-value p");
const descriptionElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// weather object
const weather = {};

weather.temperature = {
    unit: "celcius",
};

// App const and var
const KELVIN = 273;

//API Key
const key = "82005d27a116c2880c8f0fcb866998a0";

// Check if browser support geolocation
if (`geolocation` in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Does not support geolocation</p>";
}

// set user position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Show error
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

// get weather from API provider
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    // just to see if api working
    //console.log(api);

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconid = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconid}.png">`;
    temperatureElement.innerHTML = `${weather.temperature.value} &#176<span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function celciusToFahrenheit(temperature) {
    return (temperature * 9) / 5 + 32;
}

temperatureElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit === "celcius") {
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        temperatureElement.innerHTML = `${fahrenheit} &#176<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        temperatureElement.innerHTML = `${weather.temperature.value} &#176<span>C</span>`;
        weather.temperature.unit = "celcius";
    }
});
