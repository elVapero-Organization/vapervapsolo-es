document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const hamburgerSpans = hamburgerBtn.querySelectorAll('span');

    let isMenuOpen = false;

    hamburgerBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            hamburgerSpans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            hamburgerSpans[1].style.opacity = '0';
            hamburgerSpans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            mobileMenu.classList.remove('active');
            hamburgerSpans[0].style.transform = 'none';
            hamburgerSpans[1].style.opacity = '1';
            hamburgerSpans[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            hamburgerSpans[0].style.transform = 'none';
            hamburgerSpans[1].style.opacity = '1';
            hamburgerSpans[2].style.transform = 'none';
        });
    });

    // Smooth Scroll to Top




    // Optional: Add simple intersection observer for animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Slider Logic
    const sliderCards = document.querySelectorAll('.hero-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 1; // Start at second item (index 1) as typical for center focus, or 0. Using 1 to center.
    const totalCards = sliderCards.length;

    function updateSlider() {
        sliderCards.forEach((card, index) => {
            // Reset classes
            card.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2');

            // Calculate position relative to internal circular index
            // We want the 'active' card to be at the center.
            // Using a simpler approach: define exactly which index is what based on distance from current.

            let position = (index - currentIndex + totalCards) % totalCards;

            if (position === 0) {
                card.classList.add('active');
            } else if (position === totalCards - 1) { // -1 in modulo logic
                card.classList.add('prev');
            } else if (position === 1) {
                card.classList.add('next');
            } else {
                // Others overlap or hide
                // Optional: add secondary layers if 5 items visible
                if (position === totalCards - 2) card.classList.add('prev-2');
                if (position === 2) card.classList.add('next-2');
            }
        });
    }

    // Initialize
    updateSlider();

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateSlider();
    });

    // Auto loop (optional, keeping slow)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % totalCards;
    //     updateSlider();
    // }, 5000);

    // Latest Articles timeline dots behaviour
    const articleDots = document.querySelectorAll('.articles-timeline .dot');
    const articleItems = document.querySelectorAll('.article-list .article-item');
    const featuredImg = document.querySelector('.featured-img');
    const featuredTitle = document.querySelector('.featured-title');
    const featuredMeta = document.querySelector('.featured-meta');

    // Simple mapping data from article items to featured view
    function activateArticle(index) {
        if (!articleItems[index]) return;
        // remove active on dots
        articleDots.forEach(d => d.classList.remove('active'));
        if (articleDots[index]) articleDots[index].classList.add('active');

        // pick data from the article item
        const item = articleItems[index];
        const imgSrc = item.getAttribute('data-img') || 'images/product-placeholder.png';
        const titleEl = item.querySelector('.article-title');
        const metaEl = item.querySelector('.article-meta');

        if (featuredImg) featuredImg.src = imgSrc;
        if (featuredTitle && titleEl) featuredTitle.textContent = titleEl.textContent;
        if (featuredMeta && metaEl) featuredMeta.textContent = metaEl.textContent;
    }

    articleDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            activateArticle(idx);
        });
    });

    // initialize first dot active
    if (articleDots.length) articleDots[0].classList.add('active');

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
//footer togle
const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");

// Hide the top warning when the page is scrolled
const warn = document.querySelector(".warn");
if (warn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            warn.style.display = "none";
        } else {
            warn.style.display = "";
        }
    });
}

city.addEventListener("click", toggleCont);
function toggleCont() {
    city.classList.toggle("active");
    Array.from(cont).forEach((el) => {
        el.style.display = el.style.display === "block" ? "none" : "block";
    });
}

// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("ageConfirmed") != "true") {
        ageModal.style.display = "flex";
    } else {
        ageModal.style.display = "none";
    }
});

yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
    alert("Acceso denegado. Sitio solo para mayores de 18 años.");
    window.close();
    window.location.href = "https://www.google.es";
});

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}
