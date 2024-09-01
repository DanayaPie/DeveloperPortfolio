// Toggle Hamburger Menu
function toggleHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const hamburgerLinks = document.querySelector('.hamburger-links');

    hamburgerBtn.classList.toggle('active');
    hamburgerLinks.classList.toggle('active');

    // if onclick is on on hamburgerBtn and not on hamburgerLinks, close hamburger menu
    document.onclick = function (e) {
        if (!hamburgerBtn.contains(e.target) && !hamburgerLinks.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            hamburgerLinks.classList.remove('active');
        }
    }
};


// Mark nav-links as 'active' when click or scroll to each section
document.addEventListener("DOMContentLoaded", function () {

    let sections = document.querySelectorAll('.child-section');
    let navLinks = document.querySelectorAll('.nav-links a');

    window.onscroll = () => {
        sections.forEach(sec => {

            let top = window.scrollY;
            let offset = sec.offsetTop - 200;
            let height = sec.offsetHeight - 200;
            let id = sec.getAttribute('id');

            if (id == 'read-more') {
                id = 'about';
            }

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {

                    links.classList.remove('active');
                    document.querySelector('.nav-links a[href*=' + id + ']').classList.add('active');
                    document.querySelector('.hamburger-links a[href*=' + id + ']').classList.add('active');
                });
            };

        });
    };
});


// Show/Hide Read More
function showReadMore() {
    document.querySelector('#read-more').style.display = 'flex';
    document.querySelector('.read-more-btn').style.display = 'none';
}

function hideReadMore() {
    document.querySelector('#read-more').style.display = 'none';
    document.querySelector('.read-less-btn').style.display = 'flex';
    document.querySelector('.read-more-btn').style.display = 'flex';
}
