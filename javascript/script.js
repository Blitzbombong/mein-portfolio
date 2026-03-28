import { getNavSection } from "./html/nav.js";
import { getHeroSection } from "./html/hero.js";
import { getAboutSection } from "./html/about.js";
import { getSkillsSection } from "./html/skills.js";
import { getPortfolioSection } from "./html/portfolio.js";
import { myProjects } from "./functions/projectsData.js";

let currentLang = "en";
let allTranslations = {};

function setupEventListeners() {
  const langBtn = document.querySelector(".lang-switch");
  if (langBtn) {
    langBtn.addEventListener("click", toggleLanguage);
  }
}

async function init() {
  try {
    const response = await fetch("./json/translation.json");
    allTranslations = await response.json();
    renderMainContent();
    renderNavContent();
    setupEventListeners();
    setupProjectHovers();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function toggleLanguage() {
  const switcher = document.querySelector(".lang-switch");
  const en = document.getElementById("lang-en");
  const de = document.getElementById("lang-de");

  switcher.classList.toggle("switch-de");
  en.classList.toggle("active");
  de.classList.toggle("active");

  if (currentLang === "en") {
    currentLang = "de";
  } else {
    currentLang = "en";
  }
  renderNavContent();
  renderMainContent();
  setupProjectHovers();
}

function renderNavContent() {
  const navContainer = document.getElementById("nav-content");
  const lang = allTranslations[currentLang];
  navContainer.innerHTML = getNavSection(lang);
}

function renderMainContent() {
  const mainContainer = document.getElementById("main-content");
  const lang = allTranslations[currentLang];
  mainContainer.innerHTML =
    getHeroSection(lang) +
    getAboutSection(lang) +
    getSkillsSection(lang) +
    getPortfolioSection(lang);
}

function setupProjectHovers() {
    const projectItems = document.querySelectorAll('.project-item');
    const previewContainer = document.querySelector('.project-preview-container'); 
    const previewFrame = document.querySelector('.image-frame');
    const previewImg = document.getElementById('project-preview-img');

    if (!previewContainer || !previewFrame || !previewImg) return;

    projectItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const imagePath = myProjects[index].image;
            
            if (imagePath) {
                // 1. Bildquelle sofort setzen
                previewImg.src = imagePath;
                
                // 2. Positions-Klasse sofort umschalten
                previewContainer.classList.remove('align-top', 'align-center', 'align-bottom');
                
                if (index === 0) previewContainer.classList.add('align-top');
                else if (index === 1) previewContainer.classList.add('align-center');
                else if (index === 2) previewContainer.classList.add('align-bottom');
                
                // 3. Sichtbarkeit einschalten
                previewFrame.classList.add('visible');
            }
        });

        item.addEventListener('mouseleave', () => {
            previewFrame.classList.remove('visible');
        });
    });
}

document.addEventListener("DOMContentLoaded", init);
