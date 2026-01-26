// Futuristic Website Animations
// Typewriter, Particles, Scroll Animations, and Interactive Effects

(function() {
    'use strict';

    // ============================================
    // Typewriter Effect for Hero Title
    // ============================================
    function initTypewriter() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const phrases = [
            'Building the Future with AI',
            'Crafting Code & Innovation',
            'Transforming Ideas into Reality',
            'Developing Next-Gen Solutions'
        ];

        const lang = document.documentElement.lang;
        if (lang === 'de') {
            phrases[0] = 'Die Zukunft mit KI gestalten';
            phrases[1] = 'Code & Innovation entwickeln';
            phrases[2] = 'Ideen in Realität verwandeln';
            phrases[3] = 'Next-Gen Lösungen entwickeln';
        }

        // Store original HTML structure
        const originalHTML = heroTitle.innerHTML;
        const baseMatch = originalHTML.match(/^([^<]*<[^>]*>[^<]*<\/[^>]*>[^<]*<\/[^>]*>[^<]*<\/[^>]*>)/);
        const baseText = baseMatch ? baseMatch[1] : originalHTML.split('</span>')[0] + '</span>';

        // Create a span for the typewriter text
        const typewriterSpan = document.createElement('span');
        typewriterSpan.className = 'typewriter-text';
        heroTitle.appendChild(typewriterSpan);
        heroTitle.appendChild(document.createElement('span')).className = 'typewriter-cursor';

        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentPhrase = phrases[currentPhraseIndex];
            const cursor = heroTitle.querySelector('.typewriter-cursor');
            const textSpan = heroTitle.querySelector('.typewriter-text');

            if (isDeleting) {
                typingSpeed = 50;
                if (currentCharIndex > 0) {
                    currentCharIndex--;
                    if (textSpan) textSpan.textContent = currentPhrase.substring(0, currentCharIndex);
                } else {
                    isDeleting = false;
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    setTimeout(typeWriter, 500);
                    return;
                }
            } else {
                typingSpeed = 100;
                if (currentCharIndex < currentPhrase.length) {
                    if (textSpan) textSpan.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                } else {
                    isDeleting = true;
                    setTimeout(typeWriter, 2000);
                    return;
                }
            }

            setTimeout(typeWriter, typingSpeed);
        }

        // Start typewriter after a delay
        setTimeout(typeWriter, 1000);
    }

    // ============================================
    // Particle System
    // ============================================
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        let mouseX = 0;
        let mouseY = 0;
        let animationId;

        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(139, 92, 246, ';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse interaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    this.speedX += dx * 0.0001;
                    this.speedY += dy * 0.0001;
                }

                // Boundary check
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                // Keep particles in bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.opacity + ')';
                ctx.fill();

                // Draw connections
                particles.forEach(particle => {
                    const dx = this.x - particle.x;
                    const dy = this.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = this.color + (0.2 * (1 - distance / 120)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(particle.x, particle.y);
                        ctx.stroke();
                    }
                });
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            animationId = requestAnimationFrame(animate);
        }

        // Start animation
        animate();

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationId) cancelAnimationFrame(animationId);
        });
    }

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const animateElements = document.querySelectorAll('.section, .project-card, .skill-tag, .contact-link');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });

        // Add CSS class for animated state
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // Scroll Progress Indicator
    // ============================================
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6, #00f5ff);
            z-index: 10000;
            transform-origin: left;
            transform: scaleX(0);
            transition: transform 0.1s ease;
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        `;
        document.body.appendChild(progressBar);

        function updateProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollTop / scrollHeight;
            progressBar.style.transform = `scaleX(${progress})`;
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // Smooth Scroll
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#hero') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // Magnetic Cursor Effect
    // ============================================
    function initMagneticCursor() {
        const magneticElements = document.querySelectorAll('.hero-button, .project-link, .contact-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ============================================
    // Active Section Indicator
    // ============================================
    function initActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        function updateActiveSection() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateActiveSection);
        }, { passive: true });
    }

    // ============================================
    // Reduced Motion Support
    // ============================================
    function checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
            // Disable particle animation
            const canvas = document.getElementById('particles-canvas');
            if (canvas) canvas.style.display = 'none';
        }
    }

    // ============================================
    // Theme Toggle (Dark/Light Mode)
    // ============================================
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (themeToggle) {
                themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
                themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            }
        }
    }

    // ============================================
    // Lazy Load Images
    // ============================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
            });
        }
    }

    // ============================================
    // Initialize All Animations
    // ============================================
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        checkReducedMotion();
        initTypewriter();
        initParticles();
        initScrollAnimations();
        initScrollProgress();
        initSmoothScroll();
        initMagneticCursor();
        initActiveSection();
        initThemeToggle();
        initLazyLoading();
    }

    // Start initialization
    init();
})();
