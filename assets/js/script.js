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
    document.querySelector('.read-more-btn').style.display = 'none';
};

function hideReadMore() {
    document.querySelector('#read-more').style.display = 'none';
    document.querySelector('.read-less-btn').style.display = 'flex';
    document.querySelector('.read-more-btn').style.display = 'flex';
};


// SKILLS SECTION
function getSkills() {
    return [
        // Languages
        { name: 'Java', image: 'java.png', categories: ['Languages'], ranking: 1 },
        { name: 'Python', image: 'python.png', categories: ['Languages'], ranking: 2 },
        { name: 'JavaScript', image: 'javascript.png', categories: ['Languages', 'Web Development'], ranking: 3 },
        { name: 'SQL', image: 'sql.png', categories: ['Languages', 'Databases'], ranking: 4 },

        // Web Development
        { name: 'HTML', image: 'html.png', categories: ['Web Development'], ranking: 1 },
        { name: 'CSS', image: 'css.png', categories: ['Web Development'], ranking: 2 },

        // Databases
        { name: 'PostgreSQL', image: 'postgresql.png', categories: ['Databases'], ranking: 1 },
        { name: 'MongoDB', image: 'mongodb.png', categories: ['Databases'], ranking: 2 },
        { name: 'H2', image: 'h2.png', categories: ['Databases'], ranking: 3 },

        // Frameworks and Libraries
        { name: 'Spring', image: 'spring.png', categories: ['Frameworks and Libraries'], ranking: 1 },
        { name: 'Hibernate', image: 'hibernate.png', categories: ['Frameworks and Libraries'], ranking: 2 },

        // Test and Automation
        { name: 'Selenium', image: 'selenium.png', categories: ['Testing and Automation'], ranking: 1 },
        { name: 'JUnit 5', image: 'junit5.png', categories: ['Testing and Automation'], ranking: 2 },
        { name: 'Mockito', image: 'mockito.png', categories: ['Testing and Automation'], ranking: 3 },
        { name: 'Cucumber', image: 'cucumber.png', categories: ['Testing and Automation'], ranking: 4 },
        { name: 'Postman', image: 'postman.png', categories: ['Testing and Automation', 'DevOps'], ranking: 5 },

        // DevOps
        { name: 'Git', image: 'git.png', categories: ['DevOps'], ranking: 1 },
        { name: 'Jenkins', image: 'jenkins.png', categories: ['DevOps'], ranking: 2 },
        { name: 'Maven', image: 'maven.png', categories: ['DevOps'], ranking: 3 },
        { name: 'Jira', image: 'jira.png', categories: ['DevOps'], ranking: 4 },

        // Tools
        { name: 'DBeaver', image: 'dbeaver.png', categories: ['Tools'], ranking: 1 },
        { name: 'Lucidchart', image: 'lucidchart.png', categories: ['Tools'], ranking: 2 },
        { name: 'Draw.io', image: 'drawio.png', categories: ['Tools'], ranking: 3 }
    ]
};

function displaySkills(filter = 'All') {
    let skills = getSkills();

    const skillCont = document.getElementsByClassName('skill-container')[0];
    skillCont.innerHTML = ''; // clear current content

    // Filter skills based on category
    let filteredSkills = skills.filter(skill =>
        filter === 'All' || skill.categories.includes(filter)
    );

    // Display filtered skills
    filteredSkills.forEach(skill => {
        const img = new Image();
        img.src = `assets/images-files/skills/${skill.image}`;
        img.alt = skill.name;

        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        imageCard.appendChild(img);

        const skillImgCont = document.createElement('div');
        skillImgCont.classList.add('skill-img-container');
        skillImgCont.appendChild(imageCard);

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
};

function applySkillFilters() {
    const filterMappings = {
        'filter-all': 'All',
        'filter-languages': 'Languages',
        'filter-web': 'Web Development',
        'filter-db': 'Databases',
        'filter-fra-lib': 'Frameworks and Libraries',
        'filter-test': 'Testing and Automation',
        'filter-dev': 'DevOps',
        'filter-tools': 'Tools',
    };

    Object.keys(filterMappings).forEach(filterId => {
        const filterElement = document.getElementById(filterId);
        if (filterElement) {
            filterElement.addEventListener('click', function () {
                // Retrieves category name associated with filterId then update the displayed skills
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
