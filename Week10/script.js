// const cityInput = document.getElementById("cityInput");
// const searchBtn = document.getElementById("searchBtn");
// const messageDisplay = document.getElementById("messageDisplay");
// const weatherDetails = document.getElementById("weatherDetails");

// const cityNameDisplay = document.getElementById("cityName");
// const temperatureDisplay = document.getElementById("temperature");
// const descriptionDisplay = document.getElementById("description");
// const humidityDisplay = document.getElementById("humidity");
// const windSpeedDisplay = document.getElementById("windSpeed");

// // =======================================================
// // !!! IMPORTANT: API SETUP !!!
// // 1. Get a free API key from OpenWeatherMap (or similar).
// // 2. Replace the placeholder values below with your actual key and base URL.
// // =======================================================
// const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // <-- REPLACE THIS
// const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
// // =======================================================


// /**
//  * Constructs the API URL and fetches weather data using fetch, then, and catch.
//  */
// function getWeatherData(city) {
//     // 1. Construct the full API URL
//     const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`; // units=metric for Celsius

//     // Reset UI state
//     messageDisplay.textContent = "Fetching weather data...";
//     weatherDetails.style.display = 'none';

//     // 2. Use fetch to make the request
//     fetch(url)
//         // 3. First .then(): Check for response status and parse JSON
//         .then(response => {
//             if (!response.ok) {
//                 // Throw an error if the response status is not 200 (e.g., 404 for city not found)
//                 throw new Error(`City not found or API error: ${response.status}`);
//             }
//             return response.json(); // Return the promise to parse the body as JSON
//         })
//         // 4. Second .then(): Process the successfully received weather data
//         .then(data => {
//             displayWeather(data);
//         })
//         // 5. .catch(): Handle any errors during the fetch or JSON parsing
//         .catch(error => {
//             console.error("Error fetching weather:", error);
//             messageDisplay.textContent = `Could not fetch weather. ${error.message.includes('404') ? 'City not found.' : 'Please try again.'}`;
//             weatherDetails.style.display = 'none';
//         });
// }

// /**
//  * Updates the DOM with the received weather data.
//  */
// function displayWeather(data) {
//     // Extract necessary information from the API response object
//     const name = data.name;
//     const temp = data.main.temp;
//     const description = data.weather[0].description;
//     const humidity = data.main.humidity;
//     const windSpeed = data.wind.speed;

//     // Update the HTML elements
//     cityNameDisplay.textContent = name;
//     temperatureDisplay.innerHTML = `${Math.round(temp)}&deg;C`; // Use innerHTML for the degree symbol
//     descriptionDisplay.textContent = description;
//     humidityDisplay.textContent = humidity;
//     windSpeedDisplay.textContent = windSpeed;

//     // Show the details and hide the message
//     weatherDetails.style.display = 'block';
//     messageDisplay.textContent = '';
// }

// /**
//  * Handles the button click event.
//  */
// function handleSearch() {
//     const city = cityInput.value.trim();
//     if (city) {
//         getWeatherData(city);
//     } else {
//         messageDisplay.textContent = "Please enter a city name.";
//         weatherDetails.style.display = 'none';
//     }
// }

// // --- Event Listeners ---

// searchBtn.addEventListener('click', handleSearch);

// // Allow searching with Enter key
// cityInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//         handleSearch();
//     }
// });

// // Initial state message
// messageDisplay.textContent = "Enter a city to see the weather.";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const messageDisplay = document.getElementById("messageDisplay");
const weatherDetails = document.getElementById("weatherDetails");

const cityNameDisplay = document.getElementById("cityName");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const humidityDisplay = document.getElementById("humidity");
const windSpeedDisplay = document.getElementById("windSpeed");

// =======================================================
// !!! IMPORTANT: API SETUP !!!
// 1. Get a free API key from OpenWeatherMap.
// 2. Replace the placeholder below with your actual API key.
// =======================================================
const API_KEY = "67d6ee7ec710d23d4c50a1a07c4ac1c6"; // <-- REPLACE THIS WITH YOUR KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
// =======================================================


/**
 * Constructs the API URL and fetches weather data using fetch, then, and catch.
 */
function getWeatherData(city) {
    // Construct the full API URL using the template:
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`; 

    // Reset UI state
    messageDisplay.textContent = "Fetching weather data...";
    weatherDetails.style.display = 'none';

    // 1. Use fetch to make the API request (returns a Promise)
    fetch(url)
        // 2. First .then(): Check the response status and parse JSON
        .then(response => {
            if (!response.ok) {
                // If status is 404 (city not found) or other error, throw an error
                throw new Error(`City not found or API error: ${response.status}`);
            }
            return response.json(); // Returns a promise to parse the body as JSON
        })
        // 3. Second .then(): Process the successfully received data
        .then(data => {
            displayWeather(data);
        })
        // 4. .catch(): Handle any network errors, fetch failures, or errors thrown above
        .catch(error => {
            console.error("Error fetching weather:", error);
            messageDisplay.textContent = `Could not fetch weather. ${error.message.includes('404') ? 'City not found.' : 'Please ensure your API key is correct and try again.'}`;
            weatherDetails.style.display = 'none';
        });
}

/**
 * Updates the DOM with the received weather data.
 */
function displayWeather(data) {
    // Extract necessary information from the API response object
    const name = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Update the HTML elements
    cityNameDisplay.textContent = name;
    temperatureDisplay.innerHTML = `${Math.round(temp)}&deg;C`; // Round to nearest whole number
    descriptionDisplay.textContent = description;
    humidityDisplay.textContent = humidity;
    windSpeedDisplay.textContent = windSpeed;

    // Show the details and hide the message
    weatherDetails.style.display = 'block';
    messageDisplay.textContent = '';
}

/**
 * Handles the button click event.
 */
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        messageDisplay.textContent = "Please enter a city name.";
        weatherDetails.style.display = 'none';
    }
}

// --- Event Listeners ---

searchBtn.addEventListener('click', handleSearch);

// Allow searching with Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Initial state message
messageDisplay.textContent = "Enter a city to see the weather.";