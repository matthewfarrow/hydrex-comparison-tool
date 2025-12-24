// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
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
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe platform cards and benefit cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.platform-card, .benefit-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Add subtle parallax effect to hero section
let lastScrollY = window.pageYOffset;
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    
    if (hero && scrolled < 600) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Highlight Hydrex card on scroll
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const hydrexCard = document.querySelector('.hydrex-card');
            if (hydrexCard) {
                hydrexCard.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    hydrexCard.style.transform = 'scale(1)';
                }, 300);
            }
        }
    });
}, { threshold: 0.5 });

const comparisonSection = document.querySelector('.comparison-section');
if (comparisonSection) {
    highlightObserver.observe(comparisonSection);
}

// Add click tracking for CTA buttons
document.querySelectorAll('.btn-primary, .btn-cta-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Track button clicks (can integrate with analytics)
        console.log('CTA clicked:', this.textContent);
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Sticky navigation background
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Table row hover enhancement
document.querySelectorAll('.quick-compare-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(4px)';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Platform card comparison highlighting
const platformCards = document.querySelectorAll('.platform-card');

platformCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Slightly dim other cards
        platformCards.forEach(otherCard => {
            if (otherCard !== this) {
                otherCard.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        // Reset all cards
        platformCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// Add visible class for animations
const style = document.createElement('style');
style.textContent = `
    .platform-card,
    .benefit-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .platform-card.visible,
    .benefit-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        animation: ripple-animation 0.6s;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays (for future use)
        console.log('Escape pressed');
    }
    
    // Arrow key navigation between platform cards
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('platform-card')) {
            const cards = Array.from(platformCards);
            const currentIndex = cards.indexOf(activeElement);
            
            if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
                cards[currentIndex + 1].focus();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                cards[currentIndex - 1].focus();
            }
        }
    }
});

// Make platform cards focusable
platformCards.forEach(card => {
    card.setAttribute('tabindex', '0');
});

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Feature comparison tooltip (optional enhancement)
document.querySelectorAll('.check-item, .cross-item, .partial-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(4px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Mobile menu toggle (if needed)
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768 && navLinks) {
        // Mobile menu can be enhanced here
        console.log('Mobile view detected');
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// Console branding
console.log('%c🌊 Hydrex Comparison Tool', 'color: #0052FF; font-size: 24px; font-weight: bold;');
console.log('%cBuilt for Base • Omni-Liquidity MetaDEX', 'color: #00D4FF; font-size: 14px;');
console.log('%cComparing: Hydrex vs Aerodrome vs Uniswap', 'color: #4A5568; font-size: 12px;');

// Analytics ready (integrate with your analytics platform)
function trackEvent(eventName, eventData) {
    // Example: gtag('event', eventName, eventData);
    console.log('Track event:', eventName, eventData);
}

// Track page view
trackEvent('page_view', {
    page_title: 'Hydrex Comparison',
    page_location: window.location.href
});

// Track CTA clicks with more detail
document.querySelectorAll('a[href*="app.hydrex.fi"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('cta_click', {
            button_text: this.textContent.trim(),
            button_location: this.className
        });
    });
});

