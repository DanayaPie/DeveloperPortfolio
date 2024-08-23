function toggleHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const hamburgerLinks = document.querySelector('.hamburger-links');

    hamburgerBtn.classList.toggle("active");
    hamburgerLinks.classList.toggle("active");

    // if onclick is on on hamburgerBtn and not on hamburgerLinks, close hamburger menu
    document.onclick = function (e) {
        if (!hamburgerBtn.contains(e.target) && !hamburgerLinks.contains(e.target)) {
            hamburgerBtn.classList.remove("active");
            hamburgerLinks.classList.remove("active");
        }
    }
};

