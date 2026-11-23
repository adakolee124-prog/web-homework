// ==========================================================================
// Assignment 7.1: Weather App (Async/Await + Loading Spinner + Error Handling)
// ==========================================================================

const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const loadingSpinner = document.getElementById("loading-spinner");
const weatherError = document.getElementById("weather-error");
const weatherResults = document.getElementById("weather-results");

const cityTitle = document.getElementById("city-title");
const currentTemp = document.getElementById("current-temp");
const weatherDesc = document.getElementById("weather-desc");
const windSpeed = document.getElementById("wind-speed");
const forecastGrid = document.getElementById("forecast-grid");

// Helper to translate WMO weather codes into readable text & icons
function getWeatherDetails(code) {
    if (code === 0) return "☀️ Clear Sky";
    if (code <= 3) return "⛅ Partly Cloudy";
    if (code <= 48) return "🌫️ Foggy";
    if (code <= 67) return "🌧️ Rainy";
    if (code <= 77) return "❄️ Snowfall";
    if (code <= 82) return "🌦️ Rain Showers";
    return "⛈️ Thunderstorm";
}

// Main Async Fetch Function
async function fetchWeatherForCity(cityName) {
    // 1. Show spinner, hide old results & errors
    loadingSpinner.classList.remove("hidden-element");
    weatherError.classList.add("hidden-element");
    weatherResults.classList.add("hidden-element");

    try {
        // Step A: Convert city name to coordinates (Geocoding API)
        const geoUrl = `https://open-meteo.com{encodeURIComponent(cityName)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        // Handle "City not found" gracefully
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
        }

        const location = geoData.results[0];
        const { latitude, longitude, name, country } = location;

        // Step B: Fetch Current Weather & 5-Day Forecast
        const forecastUrl = `https://open-meteo.com{latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
        const weatherResponse = await fetch(forecastUrl);
        const weatherData = await weatherResponse.json();

        // Update Current Weather UI
        cityTitle.innerText = `${name}, ${country}`;
        currentTemp.innerText = `${Math.round(weatherData.current_weather.temperature)}°C`;
        weatherDesc.innerText = getWeatherDetails(weatherData.current_weather.weathercode);
        windSpeed.innerText = `💨 Wind Speed: ${weatherData.current_weather.windspeed} km/h`;

        // Render 5-Day Forecast Cards
        forecastGrid.innerHTML = "";
        const daily = weatherData.daily;

        for (let i = 0; i < daily.time.length; i++) {
            const dateObj = new Date(daily.time[i]);
            const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
            const maxTemp = Math.round(daily.temperature_2m_max[i]);
            const minTemp = Math.round(daily.temperature_2m_min[i]);
            const condition = getWeatherDetails(daily.weathercode[i]);

            const card = document.createElement("div");
            card.className = "forecast-day-card";
            card.innerHTML = `
                <div class="forecast-date">${dayName}</div>
                <div class="forecast-cond">${condition}</div>
                <div class="forecast-temps"><strong>${maxTemp}°</strong> / ${minTemp}°</div>
            `;
            forecastGrid.appendChild(card);
        }

        // Show completed results
        weatherResults.classList.remove("hidden-element");

    } catch (error) {
        weatherError.innerText = `⚠️ ${error.message}`;
        weatherError.classList.remove("hidden-element");
    } finally {
        // Always hide spinner when request completes
        loadingSpinner.classList.add("hidden-element");
    }
}

// Listen for Form Submit
weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherForCity(city);
    }
});
