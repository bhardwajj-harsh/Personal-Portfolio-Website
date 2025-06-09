// Achievement data
const achievementItems = [
    {
        title: 'Ardubotics Competition',
        description: 'Secured 1st position in this robotics competition.',
        icon: 'fas fa-robot'
    },
    {
        title: 'Microsoft Hackathon Finalist',
        description: 'Reached the finals in a competitive Microsoft hackathon.',
        icon: 'fab fa-microsoft'
    },
    {
        title: 'Professional Video Editor',
        description: 'Skilled in professional video editing and content creation.',
        icon: 'fas fa-video'
    },
    {
        title: 'Social Media Lead',
        description: 'Currently leading social media for Axions Crew, SRM University\'s dance club.',
        icon: 'fas fa-share-alt'
    }
];

// Skills data
const skills = [
    { name: 'Frontend' },
    { name: 'Backend' },
    { name: 'Communication' },
    { name: 'Teamwork/Collab' },
    { name: 'Leading Skills' },
    { name: 'Research' }
];

// Initialize GSAP animations
document.addEventListener('DOMContentLoaded', () => {
    // Intro animation
    const introTimeline = gsap.timeline();
    introTimeline
        .to('.intro-content h1', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.intro-content p', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.intro-animation', {
            opacity: 0,
            duration: 1,
            delay: 1,
            onComplete: () => {
                document.querySelector('.intro-animation').style.display = 'none';
                // Animate navbar after intro animation completes
                gsap.from('.navbar', {
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            }
        });

    // Initialize achievement items
    initializeAchievements();
    
    // Initialize skills
    initializeSkills();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Initialize achievement items
function initializeAchievements() {
    const achievementsGrid = document.querySelector('.achievements-grid');
    
    achievementItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'hover-card';
        card.innerHTML = `
            <div class="achievement-content">
                <i class="${item.icon}"></i>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        achievementsGrid.appendChild(card);
    });
}

// Initialize skills
function initializeSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'hover-card';
        skillCard.innerHTML = `
            <div class="skill-content">
                <h3>${skill.name}</h3>
            </div>
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        mobileMenuBtn.classList.toggle('active');
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    opacity: 0,
                    y: 80,
                    rotationX: -90,
                    transformOrigin: 'top center',
                    duration: 1.5,
                    ease: 'power3.out',
                    stagger: 0.2
                });

                // Animate paragraphs within the About Me section
                if (entry.target.id === 'about') {
                    gsap.from(entry.target.querySelectorAll('.about-text p'), {
                        opacity: 0,
                        y: 20,
                        duration: 1,
                        ease: 'power2.out',
                        stagger: 0.3,
                        delay: 0.5 // Delay slightly after the section animation starts
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Theme Switcher Logic
const themeToggle = document.getElementById('checkbox');

// Function to load particles based on theme
function loadParticles(theme) {
    const particlesConfig = theme === 'dark' ? 'particles-dark.json' : 'particles-light.json';
    if (window.particlesJS) {
        particlesJS.load('particles-js', particlesConfig, function() {
            console.log(`particles.js loaded - ${theme} theme`);
        });
    } else {
        console.error('particlesJS is not defined. Ensure particles.min.js is loaded.');
    }
}

// Set initial theme and load particles
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }
    loadParticles(currentTheme);
} else {
    // Default to light theme if no preference is found
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    loadParticles('light');
}

themeToggle.addEventListener('change', function(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        loadParticles('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        loadParticles('light');
    }
});

// Initialize particles.js
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('particles.js loaded - callback');
}); 