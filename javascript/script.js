
import { getNavSection } from './html/nav.js';
import { getHeroSection } from './html/hero.js';
import { getAboutSection } from './html/about.js';
import { getSkillsSection } from './html/skills.js';
import { getPortfolioSection } from './html/portfolio.js';

let currentLang = 'en';
let allTranslations = {};


function setupEventListeners() {
    const langBtn = document.querySelector('.lang-switch');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
}


async function init() {
    try {
        const response = await fetch('./json/translation.json');
        allTranslations = await response.json();
        renderMainContent();
        renderNavContent();
        setupEventListeners();
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
    getSkillsSection();
    getPortfolioSection();
}

function renderNavContent () {
    const navContainer = document.getElementById('nav-content');
    const lang = allTranslations[currentLang];
    navContainer.innerHTML = getNavSection(lang);
}

function renderMainContent() {
    const mainContainer = document.getElementById('main-content');
    const lang = allTranslations[currentLang];
    mainContainer.innerHTML = getHeroSection(lang) + getAboutSection(lang) + getSkillsSection(lang) + getPortfolioSection(lang);
}

document.addEventListener('DOMContentLoaded', init);