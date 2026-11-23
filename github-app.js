// ==========================================================================
// Assignment 7.3: GitHub Profile & Repositories Viewer
// ==========================================================================

const ghForm = document.getElementById("github-search-form");
const ghInput = document.getElementById("github-username-input");
const ghSpinner = document.getElementById("gh-spinner");
const ghError = document.getElementById("gh-error");
const ghOutput = document.getElementById("gh-profile-output");
const ghUserCard = document.getElementById("gh-user-card");
const ghReposList = document.getElementById("gh-repos-list");

async function fetchGitHubUser(username) {
    ghSpinner.classList.remove("hidden-element");
    ghError.classList.add("hidden-element");
    ghOutput.classList.add("hidden-element");

    try {
        // Fetch user profile and repositories in parallel
        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://github.com{encodeURIComponent(username)}`),
            fetch(`https://github.com{encodeURIComponent(username)}/repos?sort=updated&per_page=6`)
        ]);

        if (userResponse.status === 404) {
            throw new Error(`GitHub user "${username}" was not found.`);
        }
        if (!userResponse.ok) {
            throw new Error("GitHub API rate limit reached or network error. Please try again shortly.");
        }

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        renderProfileCard(userData);
        renderRepositories(reposData);

        ghOutput.classList.remove("hidden-element");
    } catch (error) {
        ghError.innerText = `⚠️ ${error.message}`;
        ghError.classList.remove("hidden-element");
    } finally {
        ghSpinner.classList.add("hidden-element");
    }
}

function renderProfileCard(user) {
    const bioText = user.bio || "This developer hasn't added a bio yet.";
    const locationText = user.location ? `📍 ${user.location}` : "";

    ghUserCard.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login} avatar" class="gh-avatar">
        <div class="gh-user-details">
            <div class="gh-name-row">
                <h2 style="border: none; margin: 0;">${user.name || user.login}</h2>
                <a href="${user.html_url}" target="_blank" class="gh-handle-link">@${user.login}</a>
            </div>
            <p class="gh-bio">${bioText}</p>
            ${locationText ? `<p class="gh-location">${locationText}</p>` : ""}
            <div class="gh-stats-bar">
                <div class="gh-stat-box"><strong>${user.public_repos}</strong><span>Repos</span></div>
                <div class="gh-stat-box"><strong>${user.followers}</strong><span>Followers</span></div>
                <div class="gh-stat-box"><strong>${user.following}</strong><span>Following</span></div>
            </div>
        </div>
    `;
}

function renderRepositories(repos) {
    ghReposList.innerHTML = "";

    if (!repos || repos.length === 0) {
        ghReposList.innerHTML = "<p>No public repositories found for this user.</p>";
        return;
    }

    repos.forEach(repo => {
        const repoCard = document.createElement("a");
        repoCard.href = repo.html_url;
        repoCard.target = "_blank";
        repoCard.className = "gh-repo-item";

        const desc = repo.description || "No repository description provided.";
        const lang = repo.language || "Code";

        repoCard.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${desc}</p>
            <div class="gh-repo-meta">
                <span class="gh-lang-tag">${lang}</span>
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
            </div>
        `;
        ghReposList.appendChild(repoCard);
    });
}

ghForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = ghInput.value.trim();
    if (username) {
        fetchGitHubUser(username);
    }
});

// Automatically load your own GitHub profile on initial page open!
fetchGitHubUser("adakolee124-prog");
