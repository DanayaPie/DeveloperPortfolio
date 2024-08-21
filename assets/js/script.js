const hamburgerBtn = document.getElementsByClassName('hamburger-btn')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

// if hamburger button is active, navbar links will show
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active')
    navbarLinks.classList.toggle('active')
});


