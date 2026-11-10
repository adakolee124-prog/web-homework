// ==========================================================================
// Assignment 5.5: Mobile Hamburger Menu, Dark Mode Toggle & Form Validation
// ==========================================================================

// 1. MOBILE HAMBURGER MENU TOGGLE
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinksContainer = document.getElementById("nav-links");

if (hamburgerBtn && navLinksContainer) {
    hamburgerBtn.addEventListener("click", () => {
        navLinksContainer.classList.toggle("nav-open");
    });
}

// 2. DARK MODE TOGGLE (Saves user preference in localStorage)
const darkModeBtn = document.getElementById("dark-mode-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    if (darkModeBtn) darkModeBtn.innerText = "☀️ Light Mode";
}

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        
        darkModeBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

// 3. CLIENT-SIDE FORM VALIDATION (For contact.html)
const contactForm = document.querySelector("form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh

        const nameInput = document.getElementById("fullname");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        let errorBox = document.getElementById("form-error-msg");

        if (!errorBox) {
            errorBox = document.createElement("div");
            errorBox.id = "form-error-msg";
            contactForm.prepend(errorBox);
        }

        // Validation Checks
        if (!nameInput || nameInput.value.trim().length < 2) {
            errorBox.className = "validation-alert error";
            errorBox.innerText = "⚠️ Please enter your full name (at least 2 characters).";
            return;
        }

        if (!emailInput || !emailInput.value.includes("@") || !emailInput.value.includes(".")) {
            errorBox.className = "validation-alert error";
            errorBox.innerText = "⚠️ Please enter a valid email address (e.g., name@example.com).";
            return;
        }

        if (!messageInput || messageInput.value.trim().length < 10) {
            errorBox.className = "validation-alert error";
            errorBox.innerText = "⚠️ Your message must be at least 10 characters long.";
            return;
        }

        // Valid Form Submission
        errorBox.className = "validation-alert success";
        errorBox.innerText = "✅ Success! Your message passed validation and was sent.";
        contactForm.reset();
    });
}
