// SMOOTH SCROLLING
document.addEventListener('DOMContentLoaded', function () {
    var scrollUpButton = document.getElementById('scroll-up');

    // Show the button when the user scrolls down 100px from the top
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            scrollUpButton.style.display = 'block';
        } else {
            scrollUpButton.style.display = 'none';
        }
    });

    // Smooth scroll to the top when the button is clicked
    scrollUpButton.addEventListener('click', function () {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.getElementById(toggleId),
        navbar = document.getElementById(navbarId),
        bodypadding = document.getElementById(bodyId);

    if (toggle && navbar) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('expander');
            bodypadding.classList.toggle('body-pd');
        });
    }
}
showMenu('nav-toggle', 'navbar', 'body-pd');

// LINK ACTIVE 
const linkColor = document.querySelectorAll('.nav__link');
function colorLink() {
    linkColor.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
}
linkColor.forEach(l => l.addEventListener('click', colorLink));

// COLLAPSE MENU
const linkCollapse = document.getElementsByClassName('collapse__link');
var i;

for (i = 0; i < linkCollapse.length; i++) {
    linkCollapse[i].addEventListener('click', function () {
        const collapseMenu = this.nextElementSibling;
        collapseMenu.classList.toggle('showCollapse');

        const rotate = collapseMenu.previousElementSibling;
        rotate.classList.toggle('rotate');
    });
}