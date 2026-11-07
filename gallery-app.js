// ==========================================================================
// Assignment 5.4: Image Gallery & Carousel Controller (With Keyboard Support)
// ==========================================================================

// 1. Image Dataset Array
const galleryImages = [
    {
        src: "https://unsplash.com",
        alt: "Laptop displaying clean programming code on a modern desk",
        caption: "Modern Coding Workspace"
    },
    {
        src: "https://unsplash.com",
        alt: "Matte black over-ear wireless studio headphones",
        caption: "Studio Wireless Audio"
    },
    {
        src: "https://unsplash.com",
        alt: "Developer laptop resting on a wooden coffee shop table",
        caption: "Remote Development Setup"
    },
    {
        src: "https://unsplash.com",
        alt: "Glowing green digital matrix code stream on a dark monitor",
        caption: "Cybersecurity & Data Streams"
    }
];

// 2. DOM Element Hooks
const largeDisplayImg = document.getElementById("large-display-img");
const imageCaptionText = document.getElementById("image-caption-text");
const prevSlideBtn = document.getElementById("prev-slide-btn");
const nextSlideBtn = document.getElementById("next-slide-btn");
const thumbnailStrip = document.getElementById("thumbnail-strip");

// 3. Current Active Slide Index Tracker
let currentSlideIndex = 0;

// 4. Generate Clickable Thumbnails on Page Load
function buildThumbnails() {
    thumbnailStrip.innerHTML = "";

    galleryImages.forEach((item, index) => {
        const thumbImg = document.createElement("img");
        thumbImg.src = item.src;
        thumbImg.alt = item.alt;
        thumbImg.classList.add("gallery-thumb-item");
        
        if (index === currentSlideIndex) {
            thumbImg.classList.add("active-thumb");
        }

        thumbImg.addEventListener("click", () => {
            showSlide(index);
        });

        thumbnailStrip.appendChild(thumbImg);
    });
}

// 5. Update Large Stage View & Active Thumbnail Highlight
function showSlide(index) {
    // Wrap around smoothly if user goes past the first or last image
    if (index >= galleryImages.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = galleryImages.length - 1;
    } else {
        currentSlideIndex = index;
    }

    const activePhoto = galleryImages[currentSlideIndex];
    largeDisplayImg.src = activePhoto.src;
    largeDisplayImg.alt = activePhoto.alt;
    imageCaptionText.innerText = `${currentSlideIndex + 1} / ${galleryImages.length} — ${activePhoto.caption}`;

    // Sync active highlight border on thumbnails
    const allThumbs = document.querySelectorAll(".gallery-thumb-item");
    allThumbs.forEach((thumb, idx) => {
        if (idx === currentSlideIndex) {
            thumb.classList.add("active-thumb");
        } else {
            thumb.classList.remove("active-thumb");
        }
    });
}

// 6. Next & Previous Button Click Handlers
nextSlideBtn.addEventListener("click", () => showSlide(currentSlideIndex + 1));
prevSlideBtn.addEventListener("click", () => showSlide(currentSlideIndex - 1));

// 7. Keyboard Left & Right Arrow Support
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        showSlide(currentSlideIndex + 1);
    } else if (event.key === "ArrowLeft") {
        showSlide(currentSlideIndex - 1);
    }
});

// Initialize Gallery
buildThumbnails();
showSlide(0);
