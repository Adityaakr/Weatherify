const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');

const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country')
const weatherForecastE1 = document.getElementById('weather-forecast')
const currentTempE1 = document.getElementById('current-temp');

setInterval(() => {
       const time = new Date();
       const month = time.getMonth();
       const date = time.getDate();
       const day = time.getDate();
       const hour = time.getHours();
       const hoursIn12hrFormat = hour >= 13? hour % 12: hour;
       const minutes = time.getMinutes();
       const ampm = hour > 12 ? "PM" : "AM"

       timeE1.innerHTML = hoursIn12hrFormat + ":" + minutes + "" + `<span id = 'ampm'> ${ampm}</span>`

       

}, 1000);