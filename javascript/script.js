import { getNavSection } from "./html/nav.js";
import { getHeroSection } from "./html/hero.js";
import { getAboutSection } from "./html/about.js";
import { getSkillsSection } from "./html/skills.js";
import { getPortfolioSection } from "./html/portfolio.js";
import { myProjects } from "./functions/projectsData.js";

let currentLang = "en";
let allTranslations = {};
let currentProjectIndex = 0;

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
    setupProjectClicks();
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
  setupProjectClicks();
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

function setupProjectClicks() {
    const projectItems = document.querySelectorAll('.project-item');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const nextBtn = document.getElementById('next-project-btn');

    projectItems.forEach((item, index) => {
        item.onclick = () => {
            currentProjectIndex = index; // Position speichern
            openModal(currentProjectIndex);
        };
    });

    window.addEventListener('click', (event) => {
    const modal = document.getElementById('project-modal');
    
    // Wir prüfen: Ist das Element, das angeklickt wurde (event.target),
    // genau unser dunkles Overlay-Element?
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

    // Schließen-Logik
    closeBtn.onclick = () => modal.style.display = 'none';
    
    // "Nächstes Projekt" Logik
    nextBtn.onclick = () => {
        // Wir erhöhen den Index um 1
        currentProjectIndex++;
        
        // Wenn wir am Ende der Liste sind, fangen wir wieder bei 0 an
        if (currentProjectIndex >= myProjects.length) {
            currentProjectIndex = 0;
        }
        
        openModal(currentProjectIndex);
    };
}

// Eine extra Funktion, die nur das Modal füllt
function openModal(index) {
    const project = myProjects[index];
    const modal = document.getElementById('project-modal');
    const lang = currentLang;
    const modalTechContainer = document.getElementById('modal-tech-icons');

    // Zahl formatieren (01, 02...)
    const projectNum = (index + 1).toString().padStart(2, '0');

    document.getElementById('modal-number').innerText = projectNum;
    document.getElementById('modal-title').innerText = project.name;
    document.getElementById('modal-description').innerText = project.description[lang];
    document.getElementById('modal-img').src = project.image;
    document.getElementById('modal-github').href = project.github;
    document.getElementById('modal-live').href = project.live;

    modalTechContainer.innerHTML = ''; // Vorher leeren

    project.icons.forEach(tech => {
        // Wir gehen davon aus, dass deine Bilder so heißen: assets/icons/html.svg
        const iconPath = `./icons/${tech.toLowerCase()}.svg`; 
        
        modalTechContainer.innerHTML += `
            <div class="tech-icon-item">
                <img src="${iconPath}" alt="${tech}">
                <span>${tech}</span>
            </div>
        `;
    });

    modal.style.display = 'flex';
}

document.addEventListener("DOMContentLoaded", init);
