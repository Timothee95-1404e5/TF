// Variables globales
let isNavOpen = false;
let currentSection = 'accueil';

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialisation du site
function initializeWebsite() {
    handleSplashScreen();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeFormHandling();
    initializeMissionCards();
    initializeStatisticsCounter();
    initializeParticleEffects();
}

// Gestion du splash screen
function handleSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const navbar = document.getElementById('navbar');
    
    // Masquer le splash screen après 5 secondes
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        
        // Activer la navigation après le splash screen
        setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 5000);
    
    // Empêcher le scroll pendant le splash screen
    document.body.style.overflow = 'hidden';
}

// Initialisation de la navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Toggle menu mobile
    navToggle.addEventListener('click', () => {
        isNavOpen = !isNavOpen;
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Empêcher le scroll quand le menu est ouvert
        document.body.style.overflow = isNavOpen ? 'hidden' : 'auto';
    });
    
    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Fermer le menu mobile
            if (isNavOpen) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                isNavOpen = false;
            }
            
            // Gérer la navigation smooth
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            }
        });
    });
    
    // Effet de scroll sur la navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mettre à jour le lien actif
        updateActiveNavLink();
    });
}

// Scroll vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // Hauteur de la navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Mettre à jour le lien actif dans la navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    // Mettre à jour les classes actives
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
    
    currentSection = currentSectionId;
}

// Initialisation des effets de scroll
function initializeScrollEffects() {
    // Intersection Observer pour les animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animations spécifiques pour certains éléments
                if (entry.target.classList.contains('mission-card')) {
                    animateMissionCard(entry.target);
                }
                
                if (entry.target.classList.contains('specialty-card')) {
                    animateSpecialtyCard(entry.target);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    const animateElements = document.querySelectorAll('.mission-card, .specialty-card, .timeline-item, .info-card, .contact-form');
    animateElements.forEach(el => observer.observe(el));
}

// Animations pour les cartes de mission
function animateMissionCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

// Animations pour les cartes de spécialité
function animateSpecialtyCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    }, 100);
}

// Animations pour les éléments de timeline
function animateTimelineItem(item) {
    const isEven = Array.from(item.parentNode.children).indexOf(item) % 2 === 1;
    const direction = isEven ? '50px' : '-50px';
    
    item.style.opacity = '0';
    item.style.transform = `translateX(${direction})`;
    
    setTimeout(() => {
        item.style.transition = 'all 0.8s ease-out';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, 100);
}

// Initialisation des animations générales
function initializeAnimations() {
    // Animation du scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollToSection('missions');
        });
    }
    
    // Animations des boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            createRippleEffect(btn);
        });
    });
    
    // Animation des icônes au survol
    const icons = document.querySelectorAll('.mission-icon, .info-icon, .specialty-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Effet de ripple sur les boutons
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.left + rect.width / 2 - size / 2;
    const y = rect.top + rect.height / 2 - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialisation des cartes de mission interactives
function initializeMissionCards() {
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Effet de glow
            card.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.3)';
            
            // Animation de l'icône
            const icon = card.querySelector('.mission-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
            
            // Afficher les détails
            const details = card.querySelector('.mission-details');
            if (details) {
                details.style.maxHeight = '200px';
                details.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            
            const icon = card.querySelector('.mission-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            const details = card.querySelector('.mission-details');
            if (details) {
                details.style.maxHeight = '0';
                details.style.opacity = '0';
            }
        });
        
        // Effet de clic
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Compteur animé pour les statistiques
function initializeStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    };
    
    // Observer pour déclencher l'animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetText = element.textContent;
                const target = parseInt(targetText.replace(/\D/g, ''));
                
                if (target) {
                    element.textContent = '0';
                    setTimeout(() => {
                        animateCounter(element, target);
                    }, 500);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Gestion du formulaire de contact
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(contactForm);
        });
        
        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                clearFieldError(input);
            });
        });
    }
}

// Soumission du formulaire
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validation
    if (!validateForm(form)) {
        showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
        return;
    }
    
    // Animation du bouton
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation d'envoi (remplacer par un vrai appel API)
    setTimeout(() => {
        showNotification('Votre candidature a été envoyée avec succès!', 'success');
        form.reset();
        submitBtn.innerHTML = '<span>Envoyer ma candidature</span><i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
    }, 2000);
}

// Validation du formulaire
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validation d'un champ
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Vérifier si le champ est requis
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est requis.';
    }
    
    // Validation email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Veuillez entrer une adresse email valide.';
        }
    }
    
    // Afficher/masquer l'erreur
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Afficher une erreur sur un champ
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

// Effacer l'erreur d'un champ
function clearFieldError(field) {
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Afficher une notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Gestion de la fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto-fermeture après 5 secondes
    setTimeout(closeNotification, 5000);
}

// Initialisation des effets de particules
function initializeParticleEffects() {
    const particles = document.querySelector('.particles');
    
    if (particles) {
        // Ajouter plus de particules dynamiques
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(37, 99, 235, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
                animation-delay: ${Math.random() * -20}s;
            `;
            
            particles.appendChild(particle);
        }
    }
}

// Gestion du thème et des préférences
function initializeThemeHandling() {
    // Détection de la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Application du thème (déjà sombre par défaut)
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Optimisation des performances
function initializePerformanceOptimizations() {
    // Lazy loading des images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce pour le scroll
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            // Actions de scroll optimisées
            updateActiveNavLink();
        }, 10);
    });
}

// Gestion des raccourcis clavier
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape pour fermer le menu mobile
        if (e.key === 'Escape' && isNavOpen) {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            isNavOpen = false;
        }
        
        // Navigation avec les flèches
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const sections = ['accueil', 'missions', 'carrieres', 'heritage', 'contact'];
            const currentIndex = sections.indexOf(currentSection);
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                scrollToSection(sections[currentIndex + 1]);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                scrollToSection(sections[currentIndex - 1]);
            }
        }
    });
}

// Initialisation des optimisations
document.addEventListener('DOMContentLoaded', () => {
    initializePerformanceOptimizations();
    initializeKeyboardShortcuts();
    initializeThemeHandling();
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
    // En production, envoyer l'erreur à un service de monitoring
});

// Service Worker pour la mise en cache (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker enregistré:', registration);
            })
            .catch(error => {
                console.log('Erreur Service Worker:', error);
            });
    });
}

// Analytics et tracking (à remplacer par votre solution)
function trackEvent(eventName, properties = {}) {
    // Exemple: Google Analytics, Matomo, etc.
    console.log('Événement tracké:', eventName, properties);
}

// Exemples d'utilisation du tracking
document.addEventListener('DOMContentLoaded', () => {
    // Tracking des clics sur les boutons CTA
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('cta_click', {
                button_text: btn.textContent.trim(),
                section: currentSection
            });
        });
    });
    
    // Tracking de la soumission du formulaire
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            trackEvent('form_submission', {
                form_type: 'contact',
                section: 'contact'
            });
        });
    }
});