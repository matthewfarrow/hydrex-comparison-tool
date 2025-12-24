// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all comparison features and FAQ items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.comparison-feature, .faq-item, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Highlight active section in navigation on scroll
let sections = document.querySelectorAll('.comparison-section, .faq-section, .cta-section');
let navLinks = document.querySelectorAll('.feature-card');

function highlightActiveSection() {
    let scrollPosition = window.pageYOffset + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .feature-card.active {
        border-color: var(--primary-blue);
        background: linear-gradient(135deg, rgba(0, 82, 255, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%);
        box-shadow: var(--shadow-lg);
    }
`;
document.head.appendChild(style);

// Table row hover effect enhancement
document.querySelectorAll('.comparison-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.01)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add click tracking for CTA buttons (optional - for analytics)
document.querySelectorAll('.btn-primary, .btn-primary-large, .btn-primary-nav').forEach(button => {
    button.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('CTA clicked:', this.textContent);
    });
});

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    const nav = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        // Mobile menu logic can be added here if needed
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Copy to clipboard functionality for any code snippets (if added later)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        console.log('Copied to clipboard');
    });
}

// Smooth reveal for table on scroll
const tableObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

const tableWrapper = document.querySelector('.table-wrapper');
if (tableWrapper) {
    tableWrapper.style.opacity = '0';
    tableWrapper.style.transform = 'translateY(30px)';
    tableWrapper.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    tableObserver.observe(tableWrapper);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close any modals (if added later)
    if (e.key === 'Escape') {
        // Close modal logic
    }
});

// Performance optimization: Lazy load images (if images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message for developers
console.log('%c🚀 Hydrex Comparison Tool', 'color: #0052FF; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for the Base ecosystem', 'color: #00D4FF; font-size: 12px;');

