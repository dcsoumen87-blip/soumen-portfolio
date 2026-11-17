/* =========================================
   SOUMEN MONDAL PORTFOLIO
   SOLO LEVELING ANIMATION SYSTEM
========================================= */


/* =========================================
   1. LOADER CONTROL
========================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        if (loader) {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 800);
        }

    }, 2200);

});


/* =========================================
   2. TYPING ANIMATION
========================================= */

const typingElement = document.getElementById("typing");

const roles = [
    "DISCORD DEVELOPER",
    "SECURITY SYSTEM BUILDER",
    "ESPORTS COMMUNITY STAFF",
    "TECH ENTHUSIAST",
    "AI DEVELOPER"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (deleting) {

        charIndex--;

    } else {

        charIndex++;

    }

    typingElement.textContent =
        currentRole.substring(0, charIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex === currentRole.length) {

        deleting = true;
        speed = 1600;

    } else if (deleting && charIndex === 0) {

        deleting = false;

        roleIndex = (roleIndex + 1) % roles.length;

        speed = 400;

    }

    setTimeout(typeEffect, speed);

}

typeEffect();


/* =========================================
   3. SHADOW PARTICLES
========================================= */

const canvas = document.getElementById("particles");
const ctx = canvas?.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};

function resizeCanvas() {

    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticles();

}


class ShadowParticle {

    constructor() {

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.size = Math.random() * 2 + 0.5;

        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;

        this.opacity = Math.random() * 0.6 + 0.1;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;

        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100 && distance > 0) {

                const force = (100 - distance) / 100;

                this.x += (dx / distance) * force * 1.5;
                this.y += (dy / distance) * force * 1.5;

            }

        }

    }

    draw() {

        if (!ctx) return;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(174, 114, 255, ${this.opacity})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#9b5cff";

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

    if (!canvas || !ctx) return;

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


if (canvas && ctx) {

    resizeCanvas();

    animateParticles();

    window.addEventListener("resize", resizeCanvas);

}


/* =========================================
   4. MOUSE TRACKING
========================================= */

window.addEventListener("mousemove", (event) => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});

window.addEventListener("mouseout", (event) => {

    if (!event.relatedTarget) {

        mouse.x = null;
        mouse.y = null;

    }

});


/* =========================================
   5. SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section-kicker, " +
    ".section-title-row, " +
    ".about-grid, " +
    ".skill-card, " +
    ".project-card, " +
    ".timeline article, " +
    ".contact-section > *"
);

revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   6. NAVIGATION ACTIVE STATE
========================================= */

const sections = document.querySelectorAll("main section[id]");

const navLinks = document.querySelectorAll(
    ".site-header nav a"
);


const navObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },

    {
        rootMargin: "-30% 0px -60% 0px"
    }

);


sections.forEach(section => {

    navObserver.observe(section);

});


/* =========================================
   7. SMOOTH NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   8. PROJECT HOVER EFFECT
========================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

    });

});


/* =========================================
   9. AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================
   10. SHADOW MONARCH CONSOLE
========================================= */

console.log(
    "%c SOUMEN MONDAL ",
    "background:#5422a5;color:white;padding:10px;font-size:18px;font-weight:bold;"
);

console.log(
    "%c THE SHADOW MONARCH HAS AWAKENED.",
    "color:#b98aff;font-size:14px;"
);


/* =========================================
   SYSTEM INITIALIZATION COMPLETE
========================================= */
