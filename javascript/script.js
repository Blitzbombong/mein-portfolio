
let currentLang = 'en';
let allTranslations = {};


async function init() {
    try {
        const response = await fetch('./json/translation.json');
        allTranslations = await response.json();
        renderMainContent();
        renderNavContent();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function toggleLanguage() {
    const switcher = document.querySelector('.lang-switch');
    const en = document.getElementById('lang-en');
    const de = document.getElementById('lang-de');

    switcher.classList.toggle('switch-de');
    en.classList.toggle('active');
    de.classList.toggle('active');

    if (currentLang === 'en') {
        currentLang = 'de';
    } else {
        currentLang = 'en';
    }
    renderNavContent ();
    renderMainContent();
}

function renderNavContent () {
    const navContainer = document.getElementById('nav-content');
    const lang = allTranslations[currentLang];
    navContainer.innerHTML = getNavSection(lang);
}

function renderMainContent() {
    const mainContainer = document.getElementById('main-content');
    const lang = allTranslations[currentLang];
    mainContainer.innerHTML = getHeroSection(lang) + getAboutSection(lang);
}

document.addEventListener('DOMContentLoaded', init);