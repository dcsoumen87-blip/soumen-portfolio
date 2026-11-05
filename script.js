/* =====================================
   SOUMEN MONDAL
   SHADOW MONARCH ENGINE
   VERSION 2.0
===================================== */


/* =====================================
   1. AWAKENING LOADING SCREEN
===================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 2200);

});


/* =====================================
   2. TYPING ANIMATION
===================================== */

const roles = [
    "PYTHON DEVELOPER",
    "DISCORD BOT DEVELOPER",
    "SECURITY DEVELOPER",
    "JAVASCRIPT DEVELOPER",
    "TECH ENTHUSIAST"
];

const typingElement = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {

    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typingEffect, 1500);

            return;

        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;

        }

    }

    setTimeout(
        typingEffect,
        deleting ? 45 : 90
    );

}

typingEffect();


/* =====================================
   3. SHADOW PARTICLE SYSTEM
===================================== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

class ShadowParticle {

    constructor() {

        this.x = Math.random() * window.innerWidth;

        this.y = Math.random() * window.innerHeight;

        this.size = Math.random() * 2 + 0.5;

        this.speedY = Math.random() * 0.5 + 0.1;

        this.speedX = (Math.random() - 0.5) * 0.3;

        this.opacity = Math.random() * 0.6 + 0.2;

    }

    update() {

        this.y -= this.speedY;

        this.x += this.speedX;

        if (this.y < -10) {

            this.y = window.innerHeight + 10;

            this.x = Math.random() * window.innerWidth;

        }

        if (this.x < 0 || this.x > window.innerWidth) {

            this.speedX *= -1;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(184, 132, 255, ${this.opacity})`;

        ctx.shadowBlur = 12;

        ctx.shadowColor = "#9333ea";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


function createParticles() {

    const particleCount =
        window.innerWidth < 600 ? 35 : 75;

    particles = [];

    for (let i = 0; i < particleCount; i++) {

        particles.push(new ShadowParticle());

    }

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach(particle => {

        particle.update();

        particle.draw();

    });

    requestAnimationFrame(animateParticles);

}

createParticles();

animateParticles();

window.addEventListener("resize", createParticles);


/* =====================================
   4. SCROLL REVEAL ANIMATION
===================================== */

const revealElements = document.querySelectorAll(
    ".content-section, .profile-card, .ability-card, .project-card, .mission-card"
);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =====================================
   5. ACTIVE NAVIGATION
===================================== */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll("nav a");

function updateNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 180) {

            currentSection = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateNavigation, {
    passive: true
});

updateNavigation();


/* =====================================
   6. DYNAMIC COPYRIGHT YEAR
===================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =====================================
   7. SMOOTH BUTTON INTERACTIONS
===================================== */

document.querySelectorAll(
    ".primary-btn, .secondary-btn"
).forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.96)";

        setTimeout(() => {

            button.style.transform = "";

        }, 150);

    });

});


/* =====================================
   8. SYSTEM CONSOLE
===================================== */

console.log(
    "%c SHADOW MONARCH SYSTEM ",
    "background:#080611;color:#bd83ff;padding:12px;font-size:16px;font-weight:bold;"
);

console.log(
    "%c HUNTER: SOUMEN MONDAL ",
    "color:#bd83ff;font-size:13px;font-weight:bold;"
);

console.log(
    "%c SYSTEM STATUS: ONLINE ",
    "color:#62ffad;font-size:12px;"
);

console.log("Shadow Monarch Engine initialized.");
