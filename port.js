document.addEventListener('DOMContentLoaded', () => {
    // ============ Theme Toggle ============
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon('light');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight ? 'light' : 'dark');
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // ============ Scroll Progress Bar ============
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrolled + '%';
    });

    // ============ Hamburger Menu Toggle ============
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.querySelector('i').classList.remove('fa-xmark');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // ============ Active Nav Link ============
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // ============ Project Filter ============
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-filter') === filterValue) {
                    card.classList.remove('hidden');
                    card.style.animation = 'slideInUp 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============ Back to Top Button ============
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ Contact Form Handling ============
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            try {
                submitBtn.setAttribute('aria-busy', 'true');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span><i class="fa-solid fa-paper-plane"></i>';
                
                // Formspree automatically handles the form submission
                const formData = new FormData(contactForm);
                const response = await fetch('https://formspree.io/f/xeokakyw', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    contactForm.reset();
                    contactForm.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                    
                    // Reset form after 5 seconds
                    setTimeout(() => {
                        contactForm.style.display = 'grid';
                        thankYouMessage.style.display = 'none';
                        submitBtn.setAttribute('aria-busy', 'false');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form error:', error);
                submitBtn.setAttribute('aria-busy', 'false');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                alert('There was an error sending your message. Please try again.');
            }
        });

        // Form validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
    }
    
    function validateField(field) {
        const formGroup = field.parentElement;
        const errorSpan = formGroup.querySelector('.form-error');
        let isValid = true;
        let errorMsg = '';
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value && !emailRegex.test(field.value)) {
                isValid = false;
                errorMsg = 'Please enter a valid email address';
            }
        } else if (field.type === 'text' && field.name === 'name') {
            if (field.value.length < 2) {
                isValid = false;
                errorMsg = 'Name must be at least 2 characters';
            }
        } else if (field.name === 'message') {
            if (field.value.length < 10) {
                isValid = false;
                errorMsg = 'Message must be at least 10 characters';
            }
        }
        
        if (!isValid && errorSpan) {
            errorSpan.textContent = errorMsg;
            errorSpan.classList.add('show');
        } else if (errorSpan) {
            errorSpan.classList.remove('show');
        }
    }
});