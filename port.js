document.addEventListener('DOMContentLoaded', () => {
    // Navigation smooth scroll
    document.querySelectorAll('header nav a').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // "Learn More" button
    const learnMoreBtn = document.querySelector('#home button');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.querySelector('#contact input[type="text"]').value;
            const email = document.querySelector('#contact input[type="email"]').value;
            const message = document.querySelector('#contact textarea').value;
            console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
            // Add your form submission logic here
        });
    }

    // Advanced contact form behavior
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && thankYouMessage && submitBtn) {
        // Create a spinner element
        const spinner = document.createElement('span');
        spinner.className = 'spinner';
        spinner.style.display = 'none';
        spinner.style.marginLeft = '10px';
        spinner.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
        submitBtn.appendChild(spinner);

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Disable button and show spinner
            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';

            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                spinner.style.display = 'none';
                if (response.ok) {
                    contactForm.reset();
                    contactForm.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                    thankYouMessage.style.color = '#007bff';
                    thankYouMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';

                    // Add "Send another message" button
                    if (!document.getElementById('sendAnother')) {
                        const anotherBtn = document.createElement('button');
                        anotherBtn.id = 'sendAnother';
                        anotherBtn.textContent = 'Send Another Message';
                        anotherBtn.style.marginTop = '1rem';
                        anotherBtn.style.background = '#007bff';
                        anotherBtn.style.color = '#fff';
                        anotherBtn.style.border = 'none';
                        anotherBtn.style.borderRadius = '20px';
                        anotherBtn.style.padding = '0.5rem 1.5rem';
                        anotherBtn.style.cursor = 'pointer';
                        anotherBtn.onclick = function() {
                            contactForm.style.display = 'block';
                            thankYouMessage.style.display = 'none';
                            submitBtn.disabled = false;
                        };
                        thankYouMessage.appendChild(anotherBtn);
                    }
                } else {
                    submitBtn.disabled = false;
                    thankYouMessage.style.display = 'block';
                    thankYouMessage.style.color = 'red';
                    thankYouMessage.textContent = 'Sorry, there was an error. Please try again later.';
                }
            }).catch(() => {
                spinner.style.display = 'none';
                submitBtn.disabled = false;
                thankYouMessage.style.display = 'block';
                thankYouMessage.style.color = 'red';
                thankYouMessage.textContent = 'Sorry, there was an error. Please try again later.';
            });
        });
    }

    // Sticky header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add CSS styles for sticky header
    const style = document.createElement('style');
    style.innerHTML = `
        header.sticky {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);

    // Responsive project grid
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        const setGridColumns = () => {
            if (window.innerWidth < 480) {
                projectGrid.style.gridTemplateColumns = '1fr';
            } else if (window.innerWidth < 768) {
                projectGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                projectGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }
        };
        window.addEventListener('resize', setGridColumns);
        setGridColumns();
    }

    // Back to top button
    const btn = document.getElementById('backToTop');
    if (btn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                btn.style.display = 'flex';
            } else {
                btn.style.display = 'none';
            }
        });
        btn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // Hamburger menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navUl = document.querySelector('nav ul');
    if (navToggle && navUl) {
        navToggle.addEventListener('click', () => {
            navUl.classList.toggle('open');
            navToggle.classList.toggle('active'); // For hamburger animation
        });
        // Close menu when a link is clicked
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }
});