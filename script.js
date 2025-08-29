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
    if (e.target.matches('a, button, .cta-btn, .social-card')) {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    }
});

document.addEventListener('mouseleave', (e) => {
    if (e.target.matches('a, button, .cta-btn, .social-card')) {
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
        const href = link.getAttribute('href');
        if (href && href.includes(current) && current !== '') {
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
document.querySelectorAll('.section-header, .skill-card, .about-content, .about-visual, .about-stats, .contact-info, .social-section, .stat-card').forEach(el => {
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
document.querySelectorAll('.cta-btn, .social-card').forEach(element => {
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
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
        line.style.textShadow = '2px 0 #ff00ff, -2px 0 #00ffff';
        setTimeout(() => {
            line.style.textShadow = 'none';
        }, 200);
    });
});

// Calculate dynamic age and coding years
function calculateAge() {
    const currentYear = new Date().getFullYear();
    const birthYear = 2009;
    const codingStartYear = 2021;
    
    return {
        age: currentYear - birthYear,
        codingYears: currentYear - codingStartYear
    };
}

// Update dynamic content with calculated values
function updateDynamicContent() {
    const { age, codingYears } = calculateAge();
    const currentYear = new Date().getFullYear();
    
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
    
    // Update hero description
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.textContent = `${age}-year-old passionate developer from Sri Lanka, crafting innovative digital experiences with JavaScript, Node.js, and modern web technologies.`;
    }
    
    // Update about section description
    const aboutDescription = document.querySelector('.about-card p:first-of-type');
    if (aboutDescription) {
        aboutDescription.textContent = `I'm a ${age}-year-old full stack developer from Sri Lanka with an insatiable passion for technology and innovation. Currently balancing my studies while diving deep into the world of web development, creating solutions that make a difference.`;
    }
    
    const aboutJourney = document.querySelector('.about-card p:nth-of-type(2)');
    if (aboutJourney) {
        aboutJourney.textContent = `My journey in programming started ${codingYears} years ago, and since then I've been constantly learning and building projects that challenge my skills and expand my knowledge in modern web technologies.`;
    }
    
    // Update contact section age
    const contactAgeElements = document.querySelectorAll('.contact-value');
    contactAgeElements.forEach(element => {
        if (element.textContent.includes('Years Old')) {
            element.textContent = `${age} Years Old`;
        }
    });
    
    // Update stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const statNumber = card.querySelector('.stat-number');
        const statLabel = card.querySelector('.stat-label');
        
        if (statLabel) {
            if (statLabel.textContent === 'Years Old') {
                statNumber.setAttribute('data-target', age);
                statNumber.textContent = '0'; // Reset for animation
            } else if (statLabel.textContent === 'Years Coding') {
                statNumber.setAttribute('data-target', codingYears);
                statNumber.textContent = '0'; // Reset for animation
            }
        }
    });
    
    // Update code window age display
    const ageCodeLine = document.querySelector('.code-line:nth-child(3) .number');
    if (ageCodeLine) {
        ageCodeLine.textContent = age;
    }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update dynamic content (age, coding years)
    updateDynamicContent();
    
    // Fetch social media links from API
    fetchSocialLinks();
    
    // Add stagger animation to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
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

// Fetch and populate social media links from API
async function fetchSocialLinks() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/vihanga-yt/AboutMe-Api/refs/heads/main/about.json');
        const data = await response.json();
        
        if (data.social_links) {
            populateSocialLinks(data.social_links);
        }
    } catch (error) {
        console.error('Error fetching social links:', error);
        // Keep existing hardcoded links as fallback
    }
}

// Populate social media links in hero section and contact section
function populateSocialLinks(socialLinks) {
    // Map social media platforms to their FontAwesome icons and display names
    const socialConfig = {
        instagram: { icon: 'fab fa-instagram', name: 'Instagram', description: 'Follow my journey' },
        telegram: { icon: 'fab fa-telegram', name: 'Telegram', description: 'Direct messages' },
        whatsapp: { icon: 'fab fa-whatsapp', name: 'WhatsApp', description: 'My updates' },
        facebook: { icon: 'fab fa-facebook-f', name: 'Facebook', description: 'Connect with me' },
        github: { icon: 'fab fa-github', name: 'GitHub', description: 'View my code' }
    };

    // Update hero section social preview
    const socialPreview = document.querySelector('.social-preview');
    if (socialPreview) {
        socialPreview.innerHTML = '';
        
        Object.entries(socialLinks).forEach(([platform, url]) => {
            if (url && url !== '#' && socialConfig[platform]) {
                const config = socialConfig[platform];
                const socialIcon = document.createElement('a');
                socialIcon.href = url;
                socialIcon.className = `social-icon ${platform}`;
                socialIcon.target = '_blank';
                socialIcon.rel = 'noopener noreferrer';
                socialIcon.innerHTML = `<i class="${config.icon}"></i>`;
                socialPreview.appendChild(socialIcon);
            }
        });
    }

    // Update contact section social grid
    const socialGrid = document.querySelector('.social-grid');
    if (socialGrid) {
        socialGrid.innerHTML = '';
        
        Object.entries(socialLinks).forEach(([platform, url]) => {
            if (url && url !== '#' && socialConfig[platform]) {
                const config = socialConfig[platform];
                const socialCard = document.createElement('a');
                socialCard.href = url;
                socialCard.className = `social-card ${platform} glass-card`;
                socialCard.target = '_blank';
                socialCard.rel = 'noopener noreferrer';
                
                socialCard.innerHTML = `
                    <div class="social-bg"></div>
                    <div class="social-icon-large">
                        <i class="${config.icon}"></i>
                    </div>
                    <div class="social-info">
                        <h4>${config.name}</h4>
                        <p>${config.description}</p>
                    </div>
                    <div class="social-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                `;
                
                socialGrid.appendChild(socialCard);
            }
        });
    }

    // Update footer social links
    const footerSocial = document.querySelector('.footer-social');
    if (footerSocial) {
        footerSocial.innerHTML = '';
        
        Object.entries(socialLinks).forEach(([platform, url]) => {
            if (url && url !== '#' && socialConfig[platform]) {
                const config = socialConfig[platform];
                const footerLink = document.createElement('a');
                footerLink.href = url;
                footerLink.target = '_blank';
                footerLink.rel = 'noopener noreferrer';
                footerLink.innerHTML = `<i class="${config.icon}"></i>`;
                footerSocial.appendChild(footerLink);
            }
        });
    }
}

// Fetch social links on page load
window.addEventListener('load', fetchSocialLinks);