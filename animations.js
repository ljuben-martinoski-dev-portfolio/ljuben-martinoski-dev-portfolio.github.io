// Minimalist Website Animations
// Simple scroll animations and interactions

(function() {
    'use strict';

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        if (prefersReducedMotion()) {
            document.querySelectorAll('.animate-on-scroll').forEach((el) => {
                el.classList.add('is-visible');
            });
            return;
        }

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach((el) => {
            observer.observe(el);
        });
    }

    // ============================================
    // Scroll Progress Indicator
    // ============================================
    function initScrollProgress() {
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }

        function updateProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
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
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                if (prefersReducedMotion()) {
                    target.scrollIntoView();
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
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
    // Navbar Scroll Shadow
    // ============================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ============================================
    // Reduced Motion Support
    // ============================================
    function checkReducedMotion() {
        if (prefersReducedMotion()) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }
    }

    // ============================================
    // Contact Form (optional)
    // ============================================
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const submitButton = form.querySelector('.submit-button');
        if (!submitButton) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitButton.classList.add('loading');
            window.setTimeout(() => {
                submitButton.classList.remove('loading');
            }, 1500);
        });
    }

    // ============================================
    // Custom Cursor (desktop only)
    // ============================================
    function initCustomCursor() {
        if (prefersReducedMotion()) return;
        if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'cursor-follower';
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        let dotX = mouseX;
        let dotY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dotX = e.clientX;
            dotY = e.clientY;
        });

        function animate() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

            requestAnimationFrame(animate);
        }

        animate();

        const interactiveSelectors = 'a, button, .project-card, .skill-tag, .contact-link, .hero-button';
        document.querySelectorAll(interactiveSelectors).forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
        });
    }

    // ============================================
    // Back to Top Button
    // ============================================
    function initBackToTop() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Back to top');
        btn.textContent = '↑';
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            const target = document.querySelector('#hero') || document.body;
            if (prefersReducedMotion()) {
                if (target === document.body) {
                    window.scrollTo(0, 0);
                } else {
                    target.scrollIntoView();
                }
            } else {
                if (target === document.body) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        let ticking = false;
        function onScroll() {
            const showAt = 300;
            if (window.scrollY > showAt) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // Hero Parallax (subtle)
    // ============================================
    function initParallax() {
        if (prefersReducedMotion()) return;

        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        let ticking = false;
        function updateParallax() {
            const scrollY = window.scrollY || window.pageYOffset;
            const offset = Math.min(scrollY * 0.05, 20);
            const bgOffset = Math.min(scrollY * 0.1, 40);

            heroContent.style.transform = `translate3d(0, ${offset}px, 0)`;
            document.documentElement.style.setProperty('--hero-bg-offset', `${bgOffset}px`);
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // Hero Particles
    // ============================================
    function initHeroParticles() {
        if (prefersReducedMotion()) return;

        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleCount = 18;
        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.top = Math.random() * 100 + '%';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = (Math.random() * 20).toFixed(2) + 's';
            hero.appendChild(p);
        }
    }

    // ============================================
    // Hero Subtitle Typewriter
    // ============================================
    function initTypewriter() {
        const subtitleEl = document.querySelector('.hero-subtitle');
        if (!subtitleEl) return;

        const fullText = subtitleEl.textContent.trim();
        if (!fullText) return;

        if (prefersReducedMotion()) {
            return;
        }

        subtitleEl.textContent = '';
        let i = 0;
        const typeSpeed = 50;

        function type() {
            if (i < fullText.length) {
                subtitleEl.textContent += fullText.charAt(i);
                i += 1;
                window.setTimeout(type, typeSpeed);
            }
        }

        type();
    }

    // ============================================
    // Page Loader
    // ============================================
    function initPageLoader() {
        const loader = document.querySelector('.page-loader');
        if (!loader) return;

        function hideLoader() {
            window.setTimeout(() => {
                loader.classList.add('loaded');
            }, 1000);
        }

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }
    }

    // ============================================
    // Terminal Hacking Animation
    // ============================================
    function initTerminalAnimation() {
        const terminalOverlay = document.querySelector('.terminal-overlay');
        const heroTitle = document.querySelector('.hero-title');
        const terminalLines = document.querySelectorAll('.terminal-line');
        const progressFill = document.querySelector('.progress-fill');
        const progressPercent = document.querySelector('.progress-percent');
        
        if (!terminalOverlay || !heroTitle) return;
        
        if (prefersReducedMotion()) {
            terminalOverlay.classList.add('hidden');
            heroTitle.classList.add('revealed');
            return;
        }
        
        // Random characters for phase 1
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // Code snippets for phase 2
        const codeSnippets = [
            '> npm install --save-dev',
            '> git clone https://github.com/...',
            '> const app = initialize();',
            '> document.createElement("div");',
            '> window.location.hostname',
            '> script type="text/javascript"',
            '> function init() { return true; }',
            '> console.log("Loading...");'
        ];
        
        let currentPhase = 0;
        let progress = 0;
        const totalDuration = 3000; // 3 seconds
        const progressInterval = 30; // Update every 30ms
        
        // Phase 1: Random characters (0-40% progress)
        function phase1RandomChars() {
            const line1 = terminalLines[0];
            if (!line1) return;
            
            line1.classList.add('visible');
            let charIndex = 0;
            const targetLength = 40;
            const cycles = 20; // Number of random character cycles
            
            const randomInterval = setInterval(() => {
                if (charIndex < cycles) {
                    let randomText = '';
                    for (let i = 0; i < targetLength; i++) {
                        randomText += randomChars[Math.floor(Math.random() * randomChars.length)];
                    }
                    line1.textContent = randomText;
                    charIndex++;
                } else {
                    clearInterval(randomInterval);
                }
            }, 50);
        }
        
        // Phase 2: Code snippets (40-80% progress)
        function phase2CodeSnippets() {
            const line2 = terminalLines[1];
            if (!line2) return;
            
            line2.classList.add('visible');
            let snippetIndex = 0;
            
            const snippetInterval = setInterval(() => {
                if (snippetIndex < codeSnippets.length) {
                    line2.textContent = codeSnippets[snippetIndex];
                    snippetIndex++;
                } else {
                    clearInterval(snippetInterval);
                }
            }, 200);
        }
        
        // Phase 3: Final code line (80-100% progress)
        function phase3FinalLine() {
            const line3 = terminalLines[2];
            if (!line3) return;
            
            line3.classList.add('visible');
            line3.textContent = '> Successfully loaded portfolio...';
        }
        
        // Progress bar animation
        function updateProgress() {
            const progressUpdateInterval = setInterval(() => {
                progress += (100 / (totalDuration / progressInterval));
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressUpdateInterval);
                    
                    // Hide terminal and reveal title
                    window.setTimeout(() => {
                        terminalOverlay.classList.add('hidden');
                        window.setTimeout(() => {
                            heroTitle.classList.add('revealed');
                        }, 300);
                    }, 500);
                }
                
                if (progressFill) progressFill.style.width = progress + '%';
                if (progressPercent) progressPercent.textContent = Math.floor(progress) + '%';
                
                // Phase transitions
                if (progress >= 40 && currentPhase === 0) {
                    currentPhase = 1;
                    phase2CodeSnippets();
                }
                if (progress >= 80 && currentPhase === 1) {
                    currentPhase = 2;
                    phase3FinalLine();
                }
            }, progressInterval);
        }
        
        // Start animation after page load
        function startAnimation() {
            window.setTimeout(() => {
                phase1RandomChars();
                updateProgress();
            }, 500);
        }

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            startAnimation();
        } else {
            window.addEventListener('load', startAnimation);
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
        initPageLoader();
        initTerminalAnimation();
        initHeroParticles();
        initTypewriter();
        initScrollAnimations();
        initScrollProgress();
        initSmoothScroll();
        initActiveSection();
        initNavbarScroll();
        initContactForm();
        initCustomCursor();
        initBackToTop();
        initParallax();
    }

    // Start initialization
    init();
})();
