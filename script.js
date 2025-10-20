// Mobile Menu Toggle - Handle both navbars
const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');
const navMenus = document.querySelectorAll('.nav-menu');

mobileMenuToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
        navMenus[index].classList.toggle('active');
        toggle.classList.toggle('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    mobileMenuToggles.forEach((toggle, index) => {
        if (!navMenus[index].contains(e.target) && !toggle.contains(e.target)) {
            navMenus[index].classList.remove('active');
            toggle.classList.remove('active');
        }
    });
});

// Close menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenus.forEach(menu => menu.classList.remove('active'));
        mobileMenuToggles.forEach(toggle => toggle.classList.remove('active'));
    });
});

// Tab Functionality
const tabItems = document.querySelectorAll('.tab-item');
const servicesGrids = document.querySelectorAll('.services-grid');

tabItems.forEach((tab) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabItems.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Get the tab name from data-tab attribute
        const tabName = tab.getAttribute('data-tab');

        // Hide all service grids
        servicesGrids.forEach(grid => {
            grid.style.display = 'none';
        });

        // Show the selected service grid
        const activeGrid = document.querySelector(`.services-grid[data-content="${tabName}"]`);
        if (activeGrid) {
            activeGrid.style.display = 'grid';
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const firstName = contactForm.querySelector('input[placeholder="First Name"]').value;
        const lastName = contactForm.querySelector('input[placeholder="Last Name"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;

        // Basic validation
        if (firstName && lastName && service && message) {
            // Here you would typically send the data to a server
            console.log('Form submitted:', {
                firstName,
                lastName,
                service,
                message
            });

            // Show success message
            alert('Thank you for contacting us! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // 80px offset for fixed header

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Button Hover Effects Enhancement
const buttons = document.querySelectorAll('.btn-consultation, .btn-submit, .btn-view-all');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Scroll Animation for Service Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Apply animation to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Sticky Navbar Visibility on Scroll
const header = document.querySelector('.header');
const stickyNav = document.querySelector('.nav-sticky');
const heroHeight = window.innerHeight; // 100vh

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Show sticky navbar when scrolled past hero section
    if (currentScroll > heroHeight - 100) {
        stickyNav.classList.add('visible');
    } else {
        stickyNav.classList.remove('visible');
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = 'home'; // Default to home
    const scrollPosition = window.pageYOffset + 200; // Offset for better detection

    // Get key sections
    const aboutSection = document.querySelector('#about');
    const whyusSection = document.querySelector('#whyus');
    const servicesSection = document.querySelector('#services');
    const contactSection = document.querySelector('#contact');

    // If at the very top (in hero), set home as active
    if (window.pageYOffset < heroHeight - 200) {
        current = 'home';
    }
    // About Us section
    else if (aboutSection && scrollPosition >= aboutSection.offsetTop && scrollPosition < aboutSection.offsetTop + aboutSection.clientHeight) {
        current = 'about';
    }
    // Why Us section - from "Our Approach" to just before "Services" section
    else if (whyusSection && servicesSection && scrollPosition >= whyusSection.offsetTop && scrollPosition < servicesSection.offsetTop) {
        current = 'whyus';
    }
    // Services section
    else if (servicesSection && contactSection && scrollPosition >= servicesSection.offsetTop && scrollPosition < contactSection.offsetTop) {
        current = 'services';
    }
    // Contact section
    else if (contactSection && scrollPosition >= contactSection.offsetTop) {
        current = 'contact';
    }

    // Update active class on ALL nav links (both hero and sticky navbar)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form Input Animation
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#904ce9';
        this.style.boxShadow = '0 0 0 2px rgba(144, 76, 233, 0.1)';
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '#4b4b4b';
            this.style.boxShadow = 'none';
        }
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});


