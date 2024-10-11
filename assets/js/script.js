// TOGGLE HAMBURGER MENU
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


// EVENT LISTENER
document.addEventListener("DOMContentLoaded", function () {

    // Initialized scroll navigation
    handleScrollNavigation();

    // Display all skills by default
    displaySkills();
    // Display skill by categories and mark category as active
    applySkillFilters();

    // Display different color styling for work, school, and internship 
    applyEventCardStyles();
});


// SCROLL NAVIGATION
function handleScrollNavigation() {
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
};


// SHOW / HIDE READ MORE SECTION
function showReadMore() {
    document.querySelector('#read-more').style.display = 'flex';
    readMoreBtnCont = document.querySelector('.read-more-btn-container');
    readMoreBtnCont.style.display = 'none';
    readMoreBtnCont.style.marginBottom = '0';
};

function hideReadMore() {
    document.querySelector('#read-more').style.display = 'none';
    document.querySelector('.read-more-btn-container').style.display = 'flex';
};


// SKILLS SECTION
function getSkills() {
    return {
        Languages: [
            { name: 'Java', image: 'java.png' },
            { name: 'Python', image: 'python.png' },
            { name: 'JavaScript', image: 'javascript.png' },
            { name: 'SQL', image: 'sql.png' }
        ],

        WebDevelopment: [
            { name: 'JavaScript', image: 'javascript.png' },
            { name: 'HTML', image: 'html.png' },
            { name: 'CSS', image: 'css.png' }
        ],

        Databases: [
            { name: 'SQL', image: 'sql.png' },
            { name: 'PostgreSQL', image: 'postgresql.png' },
            { name: 'MongoDB', image: 'mongodb.png' },
            { name: 'H2', image: 'h2.png' }
        ],

        FrameworksAndLibraries: [
            { name: 'Spring', image: 'spring.png' },
            { name: 'Hibernate', image: 'hibernate.png' }
        ],

        TestingAndAutomation: [
            { name: 'Selenium', image: 'selenium.png' },
            { name: 'JUnit 5', image: 'junit5.png' },
            { name: 'Mockito', image: 'mockito.png' },
            { name: 'Cucumber', image: 'cucumber.png' },
            { name: 'Postman', image: 'postman.png' }
        ],

        DevOps: [
            { name: 'Git', image: 'git.png' },
            { name: 'Jenkins', image: 'jenkins.png' },
            { name: 'Maven', image: 'maven.png' },
            { name: 'Jira', image: 'jira.png' },
            { name: 'Postman', image: 'postman.png' }
        ],

        Tools: [
            { name: 'DBeaver', image: 'dbeaver.png' },
            { name: 'Lucidchart', image: 'lucidchart.png' },
            { name: 'Draw.io', image: 'drawio.png' }
        ]
    };
};

function displaySkills(filter = 'All') {
    const skills = getSkills();

    const skillCont = document.getElementsByClassName('skill-container')[0];
    skillCont.classList.add('hide-skillCont');

    // wait for transition to finish before update skillCont
    setTimeout(() => {
        skillCont.innerHTML = ''; // clear current content

        let filteredSkills = [];
        if (filter === 'All') {
            // Gather all skills from each category
            Object.keys(skills).forEach(category => {
                filteredSkills = filteredSkills.concat(skills[category]);
            });
        } else if (skills[filter]) {
            // Get skills from the specific category
            filteredSkills = skills[filter];
        }

        // Display filtered skills
        filteredSkills.forEach(skill => {
            const img = new Image();
            img.src = `assets/images-files/tech-stacks/${skill.image}`;
            img.alt = skill.name;

            const skillImgCont = document.createElement('div');
            skillImgCont.classList.add('skill-img-container');
            skillImgCont.appendChild(img);

            const skillName = document.createElement('p');
            skillName.textContent = skill.name;

            const skillNameCont = document.createElement('div');
            skillNameCont.classList.add('skill-name-container');
            skillNameCont.appendChild(skillName);

            const skillCard = document.createElement('div');
            skillCard.classList.add('skill-card');
            skillCard.appendChild(skillImgCont);
            skillCard.appendChild(skillNameCont);

            skillCont.appendChild(skillCard);
        });

        skillCont.classList.remove('hide-skillCont');

    }, 300); // 300ms transition ease in-out
};

function applySkillFilters() {
    const filterMappings = {
        'filter-all': 'All',
        'filter-languages': 'Languages',
        'filter-web': 'WebDevelopment',
        'filter-db': 'Databases',
        'filter-fra-lib': 'FrameworksAndLibraries',
        'filter-test': 'TestingAndAutomation',
        'filter-dev': 'DevOps',
        'filter-tools': 'Tools',
    };

    Object.keys(filterMappings).forEach(filterId => {
        const filterElement = document.getElementById(filterId);
        if (filterElement) {
            filterElement.addEventListener('click', function () {
                // Retrieves category name associated with filterId then updates the displayed skills
                displaySkills(filterMappings[filterId]);
                setActiveFilter(filterId);
            });
        }
    });
};

function setActiveFilter(filterId) {

    const allFilterLinks = document.querySelectorAll('.filter-options a');
    allFilterLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.getElementById(filterId);
    if (activeLink) {
        activeLink.classList.add('active');
    };
};


// JOURNEY SECTION
function applyEventCardStyles() {
    const cardContainers = document.querySelectorAll('.card-container');

    cardContainers.forEach((cardContainer, index) => {
        const eventArrow = cardContainer.querySelector('.event-arrow');
        const eventIcon = cardContainer.querySelector('.event-icon');
        const iconText = cardContainer.querySelector('.material-symbols-outlined').textContent.trim();
        const eventCard = cardContainer.querySelector('.event-card');

        // Reset any previously assigned classes
        cardContainer.classList.remove('school-event', 'work-event', 'internship-event', 'odd-card', 'even-card');

        // Assign event types classes based on the iconText
        switch (iconText) {
            case 'school':
                cardContainer.classList.add('school-event');
                break;

            case 'work':
                cardContainer.classList.add('work-event');
                break;

            case 'edit_document':
                cardContainer.classList.add('internship-event');
                break;

            default:
                // if no icon matches
                cardContainer.classList.add('default-event');
                break;
        }

        if ((index + 1) % 2 !== 0) {
            cardContainer.classList.add('odd-card');

        } else {
            cardContainer.classList.add('even-card');
        }

    });
};


// CONTACT SECTION
// function validateContactForm() {
//     const nameInput = document.querySelector('.name-input');
//     const emailInput = document.querySelector('.email-input');
//     const subjectInput = document.querySelector('.subject-input');
//     const messageInput = document.querySelector('.message-input');

//     const nameError = nameInput.nextElementSibling;
//     const emailError = nameInput.nextElementSibling;
//     const subjectError = nameInput.nextElementSibling;
//     const messageError = nameInput.nextElementSibling;

//     let isValid = true;

//     // name input blank check
//     if (nameInput.value.trim() === '') {
//         nameError.style.display = 'block';
//         isValid = false;
//     } else {
//         nameError.style.display = 'none';
//     }

//     // email input blank check
//     if (emailInput.value.trim() === '') {
//         emailError.style.display = 'block';
//         isValid = false;
//     } else {
//         emailError.style.display = 'none';
//     }

//     // subject input blank check
//     if (subjectInput.value.trim() === '') {
//         subjectError.style.display = 'block';
//         isValid = false;
//     } else {
//         subjectError.style.display = 'none';
//     }

//     // message input blank check
//     if (messageInput.value.trim() === '') {
//         messageError.style.display = 'block';
//         isValid = false;
//     } else {
//         messageError.style.display = 'none';
//     }

//     return isValid;
// }