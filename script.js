const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather-items');

const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country')
const weatherForecastE1 = document.getElementById('weather-forecast')
const currentTempE1 = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday' , 'Thursday', 'Friday', 'Saturday' , 'Sunday']

const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 
'Sep', 'Oct', 'Nov', 'Dec']



setInterval(() => {
        const time = new Date();
        const month = time.getMonth();
        const date = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const hoursIn12hrFormat = hour >= 13 ? hour % 12: hour;
        const minutes = time.getMinutes();
        const ampm = hour > 12 ? "PM" : "AM"

    // Add leading zero for single-digit minutes
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // When it's 12 at midnight, show "00" instead of "12"
    const formattedHours = hoursIn12hrFormat === 0 ? 12 : hoursIn12hrFormat;

    timeE1.innerHTML = formattedHours + ":" + formattedMinutes + " " + 
     `<span id='ampm'>${ampm}</span>`;

    dateE1.innerHTML = days[day] +   ', ' +  date + '' + months[month];

}, 1000);

const API_KEY = '7d4823f49d535ec87fd15585df19b135';
const apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}"


/////////////////////////////////////////////////////////////////////////
const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.btn-search')

//click the button
searchBtn.addEventListener('click', () => {
        getData(searchBox.value);
})
///////////////////////////////////////////////////////////////////////////

async function getData(city){
        //geolocation to get current location
        navigator.geolocation.getCurrentPosition((success) => {
                console.log(success)

                let {latitude, longitude} = success.coords;

                const response = fetch(apiUrl + city + `&appid=${API_KEY}`);
                
                fetch(apiUrl + `&appid=${API_KEY}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
                })
}

                getData()
                
                



function showWeatherData(){
  let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;


  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + 'N' + data.lon + "E"

  currentWeatherItemsE1.innerHTML =  
  `<div class="weather-item">
  <p>Humidity</p>
  <p>${humidity}%</p>
</div>
<div class="weather-item">
  <p>Pressure</p>
  <p>${pressure}%</p>
</div>
<div class="weather-item">
  <p>Wind Speed</p>
  <p>${wind_speed}</p>
</div>;

<div class="weather-item">
  <p>sunrise</p>
  <p>${window.moment(sunrise * 1000).format('HH:mm a')}</p>
</div>;

<div class="weather-item">
  <p>sunset</p>
  <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>

`;
  
let otherDay = ""
data.daily.forEach((day, idx) => {
        if(idx == 0){

                currentTempE1.innerHTML= `
                
                <img src="https://openweathermap.org/img/wn/{day.weather[0].icon}@4x.png" 
                alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="Day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
                </div>
                
                `

        }else{
                otherDay += `
                <div class="weather-forecast-item">
            <div class="Day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="https://openweathermap.org/img/wn/{day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night -${day.temp.night}&#176; C</div>
            <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>
                
                `

        }
})
 
}
