// Animation On Scroll
AOS.init();


const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const menuBtnIcon = document.querySelector("i");

menuBtn.addEventListener('click', (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener('click', (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});


const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
});