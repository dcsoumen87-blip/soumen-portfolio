// =================================
// SOUMEN MONDAL - PORTFOLIO JS
// =================================


// 1. TYPING ANIMATION

const roles = [
    "Python Developer",
    "Discord Bot Developer",
    "Security Bot Developer",
    "JavaScript Developer",
    "Technology Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const roleElement = document.querySelector(".hero h2");

function typingEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        roleElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {
            deleting = true;

            setTimeout(typingEffect, 1500);
            return;
        }

    } else {

        roleElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typingEffect, deleting ? 45 : 90);
}

if (roleElement) {
    typingEffect();
}


// 2. SCROLL REVEAL ANIMATION

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(
    ".section, .card, .project-card"
).forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


// 3. ACTIVE NAVIGATION

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// 4. DYNAMIC COPYRIGHT YEAR

const yearElement = document.querySelector("footer p");

if (yearElement) {

    yearElement.innerHTML =
        `© ${new Date().getFullYear()} Soumen Mondal. All Rights Reserved.`;

}


// 5. BUTTON CLICK EFFECT

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.96)";

        setTimeout(() => {

            button.style.transform = "";

        }, 150);

    });

});


// 6. CONSOLE MESSAGE

console.log(
    "%c SOUMEN MONDAL | DEVELOPER PORTFOLIO ",
    "background:#9333ea;color:white;padding:10px;font-size:14px;"
);

console.log("Portfolio initialized successfully!");
