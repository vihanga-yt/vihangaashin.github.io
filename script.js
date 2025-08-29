// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effects
document.addEventListener('mouseenter', (e) => {
    if (e.target.matches('a, button, .cta-btn, .social-card, .project-card')) {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    }
});

document.addEventListener('mouseleave', (e) => {
    if (e.target.matches('a, button, .cta-btn, .social-card, .project-card')) {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    }
});

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress-fill');
                const progressValue = entry.target.querySelector('.progress-bar').dataset.progress;
                if (progressBar) {
                    setTimeout(() => {
                        progressBar.style.width = progressValue + '%';
                    }, 300);
                }
            }
            
            // Animate counters
            if (entry.target.classList.contains('stat-card')) {
                const counter = entry.target.querySelector('.stat-number');
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-header, .skill-card, .project-card, .about-content, .about-stats, .contact-info, .social-section, .stat-card').forEach(el => {
    observer.observe(el);
});

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Typing effect for hero subtitle
const typingText = document.querySelector('.typing-text');
const text = 'Full Stack Developer';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 2000);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add hover sound effect (optional)
document.querySelectorAll('.cta-btn, .social-card, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        // Add subtle vibration for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
});

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add magnetic effect to buttons
document.querySelectorAll('.cta-btn, .social-card').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Add glitch effect to name on hover
const nameLines = document.querySelectorAll('.name-line');
nameLines.forEach(line => {
    line.addEventListener('mouseenter', () => {
        line.style.animation = 'none';
        line.style.textShadow = '2px 0 #ff00ff, -2px 0 #00ffff';
        setTimeout(() => {
            line.style.textShadow = 'none';
        }, 200);
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add stagger animation to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });
});

// Add particle trail effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#667eea';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.opacity = '0.8';
    
    document.body.appendChild(particle);
    
    // Animate particle
    particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 0.8 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        particle.remove();
    };
}