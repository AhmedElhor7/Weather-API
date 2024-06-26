

// Global variables to store the current day and formatted date
let currentDay;
let nextDay;
let thirdDay;
let formattedDate;

// Function to set the current day of the week
function setCurrentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    currentDay = daysOfWeek[currentDayIndex];
    nextDay = daysOfWeek[currentDayIndex + 1];
    thirdDay = daysOfWeek[currentDayIndex + 2];
}

// Function to set the formatted date as day and month concatenated
function setFormattedDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[currentDate.getMonth()].substring(0, 3); // Get the first three letters of the month name
    formattedDate = `${day} ${month}`;
}

// Fetch weather data from API based on city input
async function fetchWeatherData(city) {
    const apiKey = '21a002fe23804fb6b8954104242406'; // Replace with your actual API key
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let data = await response.json();
        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Display weather forecast on the webpage
function displayWeather(data) {
    const location = data.location;
    const forecast = data.forecast.forecastday;
    const current  = data.current;


    containerWeather.innerHTML = '';

    // Process current day
    containerWeather.innerHTML += `
        <div class="col-xl-4 mb-5">
            <div class="card-contents secnd-color text-white rounded-2">
              <div class="days p-3 d-flex justify-content-between short-text-color">
                <span>${currentDay}</span>
                <span>${formattedDate}</span>
              </div>
              <div class="location mt-4 pb-4 short-text-color">
                <span class="ps-3 ">${location.name}</span>
              </div>
              <div class="weather">
                <h1 class="text-center pb-4">${forecast[0].day.avgtemp_c}°C</h1>
                 <span><img src="https:${forecast[0].day.condition.icon.replace('//', '')}" alt="Weather icon"></span>
              </div>
              <div class="current-weather pb-5">
                <span class="ps-3 text-info">${current.condition.text}</span>
              </div>
              <div class="more-info-at-weather short-text-color pb-5">
                <span class="ps-3 "><i class="fa-solid fa-umbrella"></i> ${forecast[0].day.daily_chance_of_rain}%</span>
                <span class="ps-4 "> <i class="fa-solid fa-wind"></i> ${forecast[0].day.maxwind_kph} km/h</span>
                <span class="ps-4 "><i class="fa-regular fa-compass"></i> ${forecast[0].day.maxtemp_c}</span>
              </div>
            </div>
        </div>
    `;

    // Process next day
    containerWeather.innerHTML += `
        <div class="col-xl-4  mb-5">
            <div class="card-contents-next-day secnd-color rounded-2 text-center">
              <div class="days p-3 short-text-color">
                <span>${nextDay}</span>
              </div>
              <div class="pb-5">
              <span><img src="https:${forecast[1].day.condition.icon.replace('//', '')}" alt="Weather icon"></span>
              </div>
              <div class="weather pb-5 text-white">
                <h2 class="h1 pb-4">${forecast[1].day.avgtemp_c}°C</h2>
                <h2 class="pb-5">${forecast[1].day.avghumidity}°C</h2>
                <h3 class="pb-5 text-info">${forecast[1].day.condition.text}</h3>
              </div>
            </div>
        </div>
    `;

    // Process third day
    containerWeather.innerHTML += `
        <div class="col-xl-4 mb-5">
            <div class="card-contents-next-day secnd-color rounded-2 text-center">
              <div class="days p-3 short-text-color">
                <span>${thirdDay}</span>
              </div>
              <div class="pb-5">
              <span><img src="https:${forecast[2].day.condition.icon.replace('//', '')}" alt="Weather icon"></span>
              </div>
              <div class="weather pb-5 text-white">
                <h2 class="h1 pb-4">${forecast[2].day.avgtemp_c}°C</h2>
                <h2 class="pb-5">${forecast[2].day.avghumidity}°C</h2>
                <h3 class="pb-5 text-info">${forecast[2].day.condition.text}</h3>
              </div>
            </div>
        </div>
    `;
}

// Event listener for input field to fetch weather data on input change
const searchInput = document.querySelector('#inputForSearch');
searchInput.addEventListener('input', function () {
    const city = searchInput.value.trim(); // Trim any leading/trailing whitespace
    if (city) {
        fetchWeatherData(city);
    }
});

// Initialize current day and formatted date
setCurrentDay();
setFormattedDate();
fetchWeatherData('cairo');
