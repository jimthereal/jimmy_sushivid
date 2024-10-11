// Fade Up Animation
AOS.init();


// SMOOTH SCROLLING (UP)
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


// SMOOTH SCROLLING (MENU)
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.menu a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            const offsetTop = document.querySelector(href).offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });
});


// MOVIE
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.movie-button a');
    const movieBox = document.querySelector('.movie-box');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const videoUrl = this.getAttribute('data-video');
            movieBox.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
        });
    });
});


// MODAL
document.addEventListener('DOMContentLoaded', function () {
    // Function to open the modal
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Disable scrolling
    }

    // Function to close the modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Attach event listeners to all buttons with a 'data-modal-target' attribute
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        var modalId = button.getAttribute('data-modal-target');
        var modal = document.querySelector(modalId);

        button.onclick = function () {
            openModal(modal);
        };

        modal.querySelector('.close').onclick = function () {
            closeModal(modal);
        };

        // Close the modal when clicking outside of it
        window.onclick = function (event) {
            if (event.target == modal) {
                closeModal(modal);
            }
        }

        // Close the modal when pressing the 'Esc' key
        document.onkeydown = function (event) {
            if (event.key === 'Escape') {
                closeModal(modal);
            }
        }
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