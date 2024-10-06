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

    handleScrollNavigation(); // Initialized scroll navigation
    displaySkills(); // Display all skills by default
    applySkillFilters(); // Display skill by categories and mark category as active
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
