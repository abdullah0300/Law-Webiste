// Service Pages JavaScript - Animations and Interactions

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service detail cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-detail-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        animateOnScroll.observe(card);
    });

    // Observe intro text
    const introTexts = document.querySelectorAll('.intro-text');
    introTexts.forEach((text, index) => {
        text.style.animationDelay = `${0.5 + index * 0.2}s`;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect enhancement to cards
    const allCards = document.querySelectorAll('.permit-type-card, .visa-type-card, .why-card, .highlight-item');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Parallax effect for page hero
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            pageHero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Number counter animation for service numbers
    const serviceNumbers = document.querySelectorAll('.service-number');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                number.style.animation = 'pulse 0.6s ease';
                countObserver.unobserve(number);
            }
        });
    }, { threshold: 0.5 });

    serviceNumbers.forEach(number => {
        countObserver.observe(number);
    });

    // Mobile menu functionality (same as main site)
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

    // Book Consultation button click handler
    const consultationBtns = document.querySelectorAll('.btn-consultation');
    consultationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html#contact';
        });
    });

    // Add reading progress bar
    createReadingProgressBar();

    // Add smooth reveal for lists
    const serviceLists = document.querySelectorAll('.service-list');
    serviceLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `all 0.5s ease ${index * 0.1}s`;

            const listObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        listObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            listObserver.observe(item);
        });
    });
});

// Reading Progress Bar
function createReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #904ce9, #7a3bc8);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Trigger animations
    setTimeout(() => {
        const heroContent = document.querySelector('.page-hero-content');
        if (heroContent) {
            heroContent.classList.add('animated');
        }
    }, 100);
});

// Add pulse animation keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);
