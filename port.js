
// Add event listener to the navigation links
document.querySelectorAll('header nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Add event listener to the "Learn More" button
document.querySelector('#home button').addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Add event listener to the form submission
document.querySelector('#contact form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#contact input[type="text"]').value;
    const email = document.querySelector('#contact input[type="email"]').value;
    const message = document.querySelector('#contact textarea').value;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    // Add your form submission logic here
});

// Make the header sticky
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
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

// Make the project grid responsive
const projectGrid = document.querySelector('.project-grid');
const projectCards = document.querySelectorAll('.project-card');
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        projectGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (window.innerWidth < 480) {
        projectGrid.style.gridTemplateColumns = 'repeat(1, 1fr)';
    } else {
        projectGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
});

// Trigger the resize event on page load
window.dispatchEvent(new Event('resize'));