const header = document.querySelector("header");
const toggleButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(".fade-in");

    function checkScroll() {
        let triggerBottom = window.innerHeight * 0.85; // Trigger slightly before full visibility

        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run once in case elements are already in view
});

// Function to update active nav link based on scroll position
function updateActiveNav() {
    let scrollY = window.scrollY;

    sections.forEach(section => {
        let sectionTop = section.offsetTop - 100;
        let sectionHeight = section.offsetHeight;
        let sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector(`nav a[href="#${sectionId}"]`).classList.add("active");
        }
    });

    let isHome = scrollY < sections[1].offsetTop - 100;
    header.style.backgroundColor = isHome ? "transparent" : "#121212"; }

// Close navbar when clicking outside
document.addEventListener("click", (event) => {
    // Check if the click was NOT inside the nav or the toggle button
    if (!nav.contains(event.target) && !toggleButton.contains(event.target)) {
        nav.classList.remove("active"); // Hide menu
    }
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        nav.classList.remove("active"); // Hide menu on click
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

// Run updateActiveNav function on scroll
window.addEventListener("scroll", updateActiveNav);

// Close menu and update active link when a nav item is clicked
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        nav.classList.remove("active"); // Hide menu on click (for mobile)
        navLinks.forEach(l => l.classList.remove("active")); // Remove active from all
        this.classList.add("active"); // Add active to clicked link
    });
});

// Toggle menu on button click (for mobile view)
toggleButton.addEventListener("click", () => {
    nav.classList.toggle("active");
});

function generateParticles() {
    const particleContainer = document.querySelector(".particles");
    
    if (particleContainer.children.length > 0) return; // Prevent multiple particle generations

    for (let i = 0; i < 5; i++) { // Reduce from 10 to 5 particles for better performance
        let particle = document.createElement("span");
        particle.classList.add("particle");

        let size = Math.random() * 6 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        let posX = Math.random() * 100;
        let posY = Math.random() * 100;
        particle.style.top = `${posY}%`;
        particle.style.left = `${posX}%`;

        let delay = Math.random() * 3;
        particle.style.animationDelay = `${delay}s`;

        particleContainer.appendChild(particle);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".about");
    const elementsToAnimate = document.querySelectorAll(".fade-in");
    const aboutWrapper = document.querySelector(".about-wrapper");

    function checkScroll() {
        let sectionTop = aboutSection.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 150) { // Trigger earlier for smoother effect
            aboutWrapper.style.opacity = "1";
            aboutWrapper.style.transform = "translateY(0)";
            elementsToAnimate.forEach(el => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            });
            generateParticles(); // Start particle effect
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run on page load in case already in view
});

document.addEventListener("DOMContentLoaded", function () {
    const serviceBoxes = document.querySelectorAll(".service-box");
    const servicesTitle = document.querySelector(".services-title");

    function checkScroll() {
        let triggerPoint = window.innerHeight - 100;

        if (servicesTitle.getBoundingClientRect().top < triggerPoint) {
            servicesTitle.classList.add("show");
        }

        serviceBoxes.forEach(box => {
            if (box.getBoundingClientRect().top < triggerPoint) {
                box.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run on page load in case already in view
});

document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    // Prevent empty form submission
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
    alert("Please fill in all fields.");
    return;
};

   const submitButton = this.querySelector("button");
   submitButton.textContent = "Sending...";
   submitButton.disabled = true; // Disable button to prevent multiple clicks

   submitButton.textContent = "Send Message";
   submitButton.disabled = false;

   const formMessage = document.getElementById("formMessage")

        try {
            const response = await fetch("https://dotempire-backend.onrender.com/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        alert(result.success || result.error);
    } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message.");
    }
});
