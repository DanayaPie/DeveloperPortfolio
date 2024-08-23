// if hamburger button is active, navbar links will show
const hamburgerBtn = document.getElementsByClassName('hamburger-btn')[0];
const hamburgerLinks = document.getElementsByClassName('hamburger-links')[0];

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active')
    hamburgerLinks.classList.toggle('active')
});



