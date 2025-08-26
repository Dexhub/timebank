// TimeBank Kids - Main JavaScript

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.innerHTML = isOpen ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '☰';
        }
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '☰';
            }
        }
    });
});

// Form Validation and Submission
function handleFormSubmit(formId, successMessage) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const formData = new FormData(form);
        
        // Basic validation
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                showError(field, 'This field is required');
            } else {
                field.classList.remove('error');
                clearError(field);
            }
        });
        
        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !isValidEmail(field.value)) {
                isValid = false;
                field.classList.add('error');
                showError(field, 'Please enter a valid email address');
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Processing...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success handling
            form.reset();
            showSuccessMessage(form, successMessage || 'Thank you! We\'ll be in touch soon.');
            
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'form_id': formId,
                    'form_type': form.dataset.formType || 'contact'
                });
            }
            
        } catch (error) {
            showErrorMessage(form, 'Something went wrong. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Email Validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

// Error/Success Message Helpers
function showError(field, message) {
    const errorDiv = field.parentElement.querySelector('.error-message') || createErrorElement();
    errorDiv.textContent = message;
    if (!field.parentElement.querySelector('.error-message')) {
        field.parentElement.appendChild(errorDiv);
    }
}

function clearError(field) {
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) errorDiv.remove();
}

function createErrorElement() {
    const div = document.createElement('div');
    div.className = 'error-message';
    div.style.color = 'red';
    div.style.fontSize = '0.875rem';
    div.style.marginTop = '0.25rem';
    return div;
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background-color: var(--growth-green);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
        animation: fadeIn 0.5s ease-out;
    `;
    successDiv.textContent = message;
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function showErrorMessage(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message-form';
    errorDiv.style.cssText = `
        background-color: #EF4444;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
    `;
    errorDiv.textContent = message;
    form.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Initialize forms
document.addEventListener('DOMContentLoaded', () => {
    handleFormSubmit('hero-signup', 'Welcome to TimeBank Kids! Check your email for next steps.');
    handleFormSubmit('footer-signup', 'You\'re on the list! We\'ll notify you when we launch.');
    handleFormSubmit('contact-form', 'Thanks for reaching out! We\'ll get back to you within 24 hours.');
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Pricing Toggle (Monthly/Yearly)
const pricingToggle = document.getElementById('pricing-toggle');
if (pricingToggle) {
    pricingToggle.addEventListener('change', (e) => {
        const isYearly = e.target.checked;
        document.querySelectorAll('.price-monthly').forEach(el => {
            el.style.display = isYearly ? 'none' : 'block';
        });
        document.querySelectorAll('.price-yearly').forEach(el => {
            el.style.display = isYearly ? 'block' : 'none';
        });
        
        // Update savings badge
        const savingsBadge = document.querySelector('.savings-badge');
        if (savingsBadge) {
            savingsBadge.style.visibility = isYearly ? 'visible' : 'hidden';
        }
    });
}

// Testimonial Carousel
class TestimonialCarousel {
    constructor(container) {
        this.container = container;
        this.testimonials = container.querySelectorAll('.testimonial');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.testimonials.length <= 1) return;
        
        this.showTestimonial(0);
        this.createDots();
        this.startAutoPlay();
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showTestimonial(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        this.updateDots(index);
        this.currentIndex = index;
    }
    
    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
        `;
        
        this.testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.style.cssText = `
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: none;
                background-color: var(--gray-300);
                cursor: pointer;
                transition: background-color 0.3s;
            `;
            dot.addEventListener('click', () => this.showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        
        this.container.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.testimonial-dot');
    }
    
    updateDots(activeIndex) {
        if (!this.dots) return;
        this.dots.forEach((dot, index) => {
            dot.style.backgroundColor = index === activeIndex ? 'var(--primary-blue)' : 'var(--gray-300)';
        });
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
            this.showTestimonial(nextIndex);
        }, 5000);
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Initialize testimonial carousels
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
        new TestimonialCarousel(carousel);
    });
});

// Countdown Timer for Special Offers
function initCountdown(endDate, elementId) {
    const countdownEl = document.getElementById(elementId);
    if (!countdownEl) return;
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            countdownEl.innerHTML = 'EXPIRED';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownEl.innerHTML = `
            <span>${days}d</span> 
            <span>${hours}h</span> 
            <span>${minutes}m</span> 
            <span>${seconds}s</span>
        `;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Analytics Helper
function trackEvent(action, category, label, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    }
}

// Track CTA Clicks
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-track]').forEach(element => {
        element.addEventListener('click', () => {
            const trackData = element.dataset.track.split(',');
            trackEvent(trackData[0], trackData[1], trackData[2]);
        });
    });
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Accessibility: Skip to Content
document.addEventListener('DOMContentLoaded', () => {
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.getElementById('main-content');
            if (main) {
                main.tabIndex = -1;
                main.focus();
            }
        });
    }
});