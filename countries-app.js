// ==========================================================================
// Assignment 7.5: REST Countries v3.1 API Explorer (Built from Official Docs)
// Official Docs Endpoint: https://restcountries.com{name}
// ==========================================================================

const countryForm = document.getElementById("country-search-form");
const countryInput = document.getElementById("country-input");
const countrySpinner = document.getElementById("country-spinner");
const countryError = document.getElementById("country-error");
const countryResultBox = document.getElementById("country-result-box");

async function fetchCountryInfo(countryName) {
    countrySpinner.classList.remove("hidden-element");
    countryError.classList.add("hidden-element");
    countryResultBox.classList.add("hidden-element");

    try {
        const response = await fetch(`https://restcountries.com${encodeURIComponent(countryName)}`);
        
        if (!response.ok) {
            throw new Error(`Country "${countryName}" not found. Please check the spelling.`);
        }

        const data = await response.json();
        const country = data;

        // Extract dynamic currency & languages from API response objects
        const currencyObj = country.currencies ? Object.values(country.currencies) : null;
        const currencyText = currencyObj ? `${currencyObj.name} (${currencyObj.symbol || ""})` : "N/A";
        const languagesText = country.languages ? Object.values(country.languages).join(", ") : "N/A";
        const capitalText = country.capital ? country.capital : "N/A";

        countryResultBox.innerHTML = `
            <div class="country-profile-card">
                <img src="${country.flags.svg}" alt="${country.flags.alt || country.name.common + ' flag'}" class="country-flag-img">
                <div class="country-details">
                    <h2 style="border: none; margin: 0 0 10px 0;">${country.name.common}</h2>
                    <p><strong>Official Name:</strong> ${country.name.official}</p>
                    <p><strong>Capital City:</strong> ${capitalText}</p>
                    <p><strong>Region:</strong> ${country.region} (${country.subregion || ""})</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Currency:</strong> ${currencyText}</p>
                    <p><strong>Languages:</strong> ${languagesText}</p>
                </div>
            </div>
        `;

        countryResultBox.classList.remove("hidden-element");
    } catch (error) {
        countryError.innerText = `⚠️ ${error.message}`;
        countryError.classList.remove("hidden-element");
    } finally {
        countrySpinner.classList.add("hidden-element");
    }
}

countryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = countryInput.value.trim();
    if (query) {
        fetchCountryInfo(query);
    }
});

// Load Nigeria automatically on initial page load
fetchCountryInfo("Nigeria");
