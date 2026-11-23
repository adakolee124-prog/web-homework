// ==========================================================================
// Assignment 7.2: Movie & TV Search (Debounced Input + Poster Grid + Modal)
// ==========================================================================

const searchInput = document.getElementById("movie-search-input");
const moviesGrid = document.getElementById("movies-grid");
const movieSpinner = document.getElementById("movie-spinner");
const movieStatusMsg = document.getElementById("movie-status-msg");

const modalOverlay = document.getElementById("movie-modal-overlay");
const modalTitle = document.getElementById("modal-movie-title");
const modalBody = document.getElementById("modal-movie-body");
const closeModalBtn = document.getElementById("close-movie-modal");

// 1. Debounce Helper Function (Waits 'delay' ms after the last keystroke)
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 2. Fetch Shows/Movies from API
async function searchCatalog(query) {
    if (!query) {
        moviesGrid.innerHTML = "";
        movieStatusMsg.innerText = "";
        return;
    }

    movieSpinner.classList.remove("hidden-element");
    movieStatusMsg.innerText = "";
    moviesGrid.innerHTML = "";

    try {
        const response = await fetch(`https://tvmaze.com{encodeURIComponent(query)}`);
        const results = await response.json();

        if (results.length === 0) {
            movieStatusMsg.innerText = `No results found for "${query}". Try another title.`;
            return;
        }

        renderPosterGrid(results);
    } catch (error) {
        movieStatusMsg.innerText = "⚠️ Failed to fetch results. Check your internet connection.";
    } finally {
        movieSpinner.classList.add("hidden-element");
    }
}

// 3. Render Grid of Posters
function renderPosterGrid(items) {
    moviesGrid.innerHTML = "";

    items.forEach(entry => {
        const show = entry.show;
        const posterUrl = show.image ? show.image.medium : "https://placeholder.com";
        const year = show.premiered ? show.premiered.slice(0, 4) : "N/A";
        const rating = show.rating && show.rating.average ? `⭐ ${show.rating.average}` : "No rating";

        const card = document.createElement("div");
        card.className = "poster-card";
        card.innerHTML = `
            <img src="${posterUrl}" alt="${show.name} poster">
            <div class="poster-info">
                <h4>${show.name}</h4>
                <span>${year} • ${rating}</span>
            </div>
        `;

        // Open details modal on click
        card.addEventListener("click", () => openDetailsModal(show, posterUrl, year, rating));
        moviesGrid.appendChild(card);
    });
}

// 4. Open Details Modal View
function openDetailsModal(show, posterUrl, year, rating) {
    modalTitle.innerText = `${show.name} (${year})`;
    const genres = show.genres && show.genres.length > 0 ? show.genres.join(", ") : "General";
    const summaryHtml = show.summary || "<p>No description available for this title.</p>";

    modalBody.innerHTML = `
        <div style="display: flex; gap: 18px; align-items: flex-start;">
            <img src="${posterUrl}" alt="${show.name}" style="width: 130px; border-radius: 6px; margin: 0;">
            <div>
                <p style="margin-top: 0;"><strong>Rating:</strong> ${rating}</p>
                <p><strong>Genres:</strong> ${genres}</p>
                <p><strong>Status:</strong> ${show.status || "Unknown"}</p>
            </div>
        </div>
        <div style="margin-top: 15px; line-height: 1.6;">${summaryHtml}</div>
    `;

    modalOverlay.classList.remove("hidden-element");
}

// Close Modal Handlers
closeModalBtn.addEventListener("click", () => modalOverlay.classList.add("hidden-element"));
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.add("hidden-element");
});

// 5. Attach Debounced Listener (500ms wait after typing stops)
const handleDebouncedSearch = debounce((event) => {
    searchCatalog(event.target.value.trim());
}, 500);

searchInput.addEventListener("input", handleDebouncedSearch);
