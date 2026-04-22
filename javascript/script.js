import { getNavSection } from "./html/nav.js";
import { getLangSwitchHTML } from "./html/nav.js";
import { getMobileMenu } from "./html/nav.js";
import { getHeroSection } from "./html/hero.js";
import { getAboutSection } from "./html/about.js";
import { getSkillsSection } from "./html/skills.js";
import { getPortfolioSection } from "./html/portfolio.js";
import { myProjects } from "./functions/projectsData.js";
import { renderTechIcons } from "./html/portfolio.js";
import { getMindsetSection } from "./html/mindset.js";
import { getContactSection } from "./html/contact.js";
import { getFooterSection } from "./html/footer.js";
import { initContactForm } from "./js/form.js";
import { renderLegalView } from "./js/form.js";
import { updateSlider, setupMindsetEvents } from "./js/form.js";

let currentLang = "de";
let allTranslations = {};
let currentProjectIndex = 0;

const burgerBtn = document.getElementById('burger-btn');
const mobileNav = document.getElementById('mobile-nav');

/**
 * Sets up event listeners for the language switch button.
 * When the language switch button is clicked, the toggleLanguage function is called.
 */
function setupEventListeners() {
  // 1. Sprache
  setupLanguageListeners();
  setupNavLinksListeners();

  // 2. Burger Button
  const burgerBtn = document.getElementById('burger-btn');
  if (burgerBtn) burgerBtn.onclick = toggleMobileMenu;

  // 3. Overlay
  const overlay = document.getElementById('menu-overlay');
  if (overlay) overlay.onclick = closeMobileMenu;
}

function setupLanguageListeners() {
  const langBtns = document.querySelectorAll(".lang-switch");
  langBtns.forEach(btn => btn.onclick = toggleLanguage);
}

function setupNavLinksListeners() {
  // Wir suchen alle Links, die sich im mobilen Menü befinden
  const mobileLinks = document.querySelectorAll('#mobile-nav .nav a');

  mobileLinks.forEach(link => {
    link.onclick = () => {
      // Wenn ein Link geklickt wird, rufen wir unsere Aufräum-Funktion auf
      closeMobileMenu(); 
      
      // Kleiner Bonus: Wir können hier auch eine kleine Verzögerung einbauen,
      // falls das Scrollen sanfter aussehen soll.
    };
  });
}

function toggleMobileMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('menu-overlay');

  if (!burgerBtn || !mobileNav) return;

  burgerBtn.classList.toggle('is-active');
  mobileNav.classList.toggle('is-open');
  
  if (overlay) overlay.classList.toggle('is-visible');

  const isOpen = mobileNav.classList.contains('is-open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('menu-overlay');

  if (burgerBtn) burgerBtn.classList.remove('is-active');
  if (mobileNav) mobileNav.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
}


/**
 * Initializes the application by loading the translations from a JSON file, rendering the main content, initializing the contact form, setting up event listeners for the project hover and click events, setting up the mindset section event listeners, updating the slider, updating the language switcher UI and setting up event listeners for the language switch button.
 * @throws {Error} An error is thrown if there is an issue loading the translations from the JSON file.
 */
async function init() {
  const savedLang = localStorage.getItem("portfolio-lang") || "de";
  window.currentLang = savedLang;

  try {
    const response = await fetch("./json/translation.json");
    window.allTranslations = await response.json();
    renderMainContent();
    renderNavContent();
    initContactForm(); 
    setupProjectHovers();
    setupProjectClicks();

    setupMindsetEvents(); 
    updateSlider(window.allTranslations[window.currentLang]);
    updateSwitcherUI(); 

    setupEventListeners(); 
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}


/**
 * Toggles the language between English and German.
 * It toggles the language switch button UI, toggles the active class on the language buttons, updates the current language variable, updates the local storage with the new language, renders the navigation content, renders the main content, sets up the project hover events, sets up the project click events, and updates the mindset slider.
 */
function toggleLanguage() {
  const switcher = document.querySelector(".lang-switch");
  const en = document.getElementById("lang-en");
  const de = document.getElementById("lang-de");

  switcher.classList.toggle("switch-de");
  en.classList.toggle("active");
  de.classList.toggle("active");
  closeMobileMenu();

  window.currentLang = (window.currentLang === "en") ? "de" : "en";
  localStorage.setItem("portfolio-lang", window.currentLang);

  renderNavContent();
  renderMainContent();
  setupProjectHovers();
  setupProjectClicks();
  updateSlider(window.allTranslations[window.currentLang]);
}

/**
 * Updates the language switcher UI based on the current language.
 * It removes or adds the "switch-de" class to the language switcher element, and adds or removes the "active" class to the English and German language button elements.
 */
function updateSwitcherUI() {
  const switcher = document.querySelector(".lang-switch");
  const en = document.getElementById("lang-en");
  const de = document.getElementById("lang-de");

  if (!switcher || !en || !de) return;

  // Wir setzen den Zustand ABSOLUT basierend auf der Variable
  if (window.currentLang === "de") {
    switcher.classList.add("switch-de");
    de.classList.add("active");
    en.classList.remove("active");
  } else {
    switcher.classList.remove("switch-de");
    en.classList.add("active");
    de.classList.remove("active");
  }
}

/**
 * Renders the HTML for the navigation section of the webpage based on the current language.
 * It gets the language object from the allTranslations object based on the current language,
 * and sets the innerHTML of the navigation container element to the result of calling getNavSection with the language object.
 * @returns {void}
 */
function renderNavContent() {
  const lang = window.allTranslations[window.currentLang];

  // 1. Alle benötigten Ankerplätze aus dem HTML suchen
  const navContainer = document.getElementById("nav-content");
  const desktopLang = document.getElementById("desktop-lang-container");
  const mobileContainer = document.getElementById("mobile-menu-container");

  // 2. Desktop Links einspritzen
  if (navContainer) {
    navContainer.innerHTML = getNavSection(lang);
  }

  // 3. Desktop Sprachschalter einspritzen
  if (desktopLang) {
    desktopLang.innerHTML = getLangSwitchHTML();
  }

  // 4. Mobiles Menü (komplett mit Links & Schalter) einspritzen
  if (mobileContainer) {
    mobileContainer.innerHTML = getMobileMenu(lang);
  }

  // 5. Logik-Reset: Jetzt, wo das HTML im DOM ist, binden wir die Events neu
  setupEventListeners();
  
  // 6. UI-Synchronisation: Sicherstellen, dass alle Schalter DE oder EN richtig anzeigen
  updateSwitcherUI();
}

/**
 * Renders the HTML for the main content section of the webpage based on the current language.
 * It gets the language object from the allTranslations object based on the current language,
 * and sets the innerHTML of the main content container element to the result of calling
 * getHeroSection, getAboutSection, getSkillsSection, getPortfolioSection, getMindsetSection, and getContactSection with the language object.
 * It also updates the footer section with the result of calling getFooterSection with the language object.
 * Finally, it calls renderLegalView and updateSlider with the language object, and sets up the mindset section event listeners with setupMindsetEvents.
 * @returns {void}
 */
function renderMainContent() {
  const mainContainer = document.getElementById("main-content");
  const footerContainer = document.getElementById("footer-content");
  const lang = window.allTranslations[window.currentLang];
  if (!lang) {
    console.error("Daten für 'lang' konnten nicht geladen werden!", window.allTranslations);
    return;
  }

  if (mainContainer) {
    mainContainer.innerHTML =
      getHeroSection(lang) +
      getAboutSection(lang) +
      getSkillsSection(lang) +
      getPortfolioSection(lang) +
      getMindsetSection(lang) +
      getContactSection(lang);
  }
  if (footerContainer) {
    footerContainer.innerHTML = getFooterSection(lang);
  }
  renderLegalView(lang);
  updateSlider(lang);
  setupMindsetEvents();
}

/**
 * Sets up event listeners for project hover and click events.
 * When a project item is hovered, the handleHoverIn function is called with the index of the project item, the preview image element, the preview container element, and the preview frame element.
 * When a project item is left, the handleHoverOut function is called.
 * If the project preview container, frame, or image elements do not exist, the function returns without doing anything.
 */
function setupProjectHovers() {
  const projectItems = document.querySelectorAll(".project-item");
  const container = document.querySelector(".project-preview-container");
  const frame = document.querySelector(".image-frame");
  const img = document.getElementById("project-preview-img");

  if (!container || !frame || !img) return;

  projectItems.forEach((item, index) => {
    item.onmouseenter = () => handleHoverIn(index, img, container, frame);
    item.onmouseleave = () => frame.classList.remove("visible");
  });
}

/**
 * Handles project hover in events by setting the src attribute of the project preview image element
 * to the image path of the project at the given index, and updating the alignment of the preview container
 * based on the index. It also adds the "visible" class to the preview frame element.
 * @param {number} index - the index of the project item in the myProjects array.
 * @param {HTMLImageElement} img - the project preview image element.
 * @param {HTMLElement} container - the project preview container element.
 * @param {HTMLElement} frame - the project preview frame element.
 */
function handleHoverIn(index, img, container, frame) {
  const imagePath = myProjects[index]?.image;
  if (!imagePath) return;

  img.src = imagePath;
  updatePreviewAlignment(container, index);
  frame.classList.add("visible");
}

/**
 * Updates the alignment of the project preview container based on the given index.
 * The alignment classes are "align-top", "align-center", and "align-bottom", and the index
 * corresponds to the position of the class in the array.
 * @param {HTMLElement} container - the project preview container element.
 * @param {number} index - the index of the project item in the myProjects array.
 */
function updatePreviewAlignment(container, index) {
  const positions = ["align-top", "align-center", "align-bottom"];
  container.classList.remove(...positions);

  const currentClass = positions[index];
  if (currentClass) container.classList.add(currentClass);
}

/**
 * Sets up event listeners for project items in the portfolio section, modal close events, and modal navigation events.
 * It binds the onclick event of each project item to the openModal function with the index of the project item.
 * It binds the onclick event of the close modal button to the closeProjectModal function with the modal element.
 * It sets up a window.onclick event listener to close the modal if the target of the click event is the modal element.
 * @returns {void}
 */
function setupProjectClicks() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  bindProjectItemClicks();
  bindModalCloseEvents(modal);
  bindModalNavigation();
}

/**
 * Binds the onclick event of each project item to the openModal function with the index of the project item.
 * This function sets up event listeners for project items in the portfolio section, which when clicked will open the project modal with the corresponding functional details of the project item.
 * @returns {void}
 */
function bindProjectItemClicks() {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item, index) => {
    item.onclick = () => {
      currentProjectIndex = index;
      openModal(currentProjectIndex);
    };
  });
}

/**
 * Sets up event listeners for closing the project modal.
 * It binds the onclick event of the close modal button to the closeProjectModal function with the modal element.
 * It sets up a window.onclick event listener to close the modal if the target of the click event is the modal element.
 * @param {HTMLElement} modal - The modal element to close when the close button or window is clicked.
 */
function bindModalCloseEvents(modal) {
  const closeBtn = document.getElementById("close-modal-btn");
  if (!closeBtn) return;

  closeBtn.onclick = () => closeProjectModal(modal);

  window.onclick = (event) => {
    if (event.target === modal) closeProjectModal(modal);
  };
}

/**
 * Sets up event listeners for navigating the project modal.
 * It binds the onclick event of the next project button to the handleNextProject function.
 * When the next project button is clicked, the handleNextProject function will be called with the current project index.
 * The handleNextProject function will update the current project index to the next project item in the myProjects array.
 * If the next project item does not exist, it will loop back to the start of the array.
 * @returns {void}
 */
function bindModalNavigation() {
  const nextBtn = document.getElementById("next-project-btn");
  if (nextBtn) {
    nextBtn.onclick = handleNextProject;
  }
}

/**
 * Handles the next project button click event by updating the current project index to the next project item in the myProjects array.
 * If the next project item does not exist, it will loop back to the start of the array.
 * It then calls the openModal function with the updated current project index to open the modal with the new project item.
 */
function handleNextProject() {
  currentProjectIndex = (currentProjectIndex + 1) % myProjects.length;
  openModal(currentProjectIndex);
}

/**
 * Closes the project modal by setting its display property to "none".
 * @param {HTMLElement} modal - The modal element to close.
 */
function closeProjectModal(modal) {
  modal.style.display = "none";
}

/**
 * Opens the project modal with the specified project item.
 * It updates the modal content by calling the updateModalContent function with the project item and index.
 * It renders the tech icons by calling the renderTechIcons function with the project item's icons.
 * It updates the modal image by calling the updateModalImage function with the project item's image.
 * It sets the display property of the modal element to "flex" to show the modal.
 * @param {number} index - The index of the project item to show in the modal.
 */
function openModal(index) {
  const project = myProjects[index];
  const modal = document.getElementById("project-modal");

  updateModalContent(project, index);
  renderTechIcons(project.icons);
  updateModalImage(project.image);

  modal.style.display = "flex";
}

/**
 * Updates the project modal image by setting its src attribute to the specified image source.
 * It first sets the opacity of the image to 0, then sets the src attribute to the new image source after a 50ms delay.
 * When the new image is loaded, it sets the opacity of the image back to 1.
 * @param {string} imageSrc - The source of the new image to display in the modal.
 */
function updateModalImage(imageSrc) {
  const modalImg = document.getElementById("modal-img");
  modalImg.style.opacity = "0";

  setTimeout(() => {
    modalImg.src = imageSrc;
    modalImg.onload = () => {
      modalImg.style.opacity = "1";
    };
  }, 50);
}

/**
 * Updates the content of the project modal with the specified project item and index.
 * It sets the project number, title, description, github link, and live link of the modal
 * to the corresponding values of the project item.
 * @param {object} project - The project item to show in the modal.
 * @param {number} index - The index of the project item to show in the modal.
 */
function updateModalContent(project, index) {
  const projectNum = (index + 1).toString().padStart(2, "0");
  const lang = currentLang;

  document.getElementById("modal-number").innerText = projectNum;
  document.getElementById("modal-title").innerText = project.name;
  document.getElementById("modal-description").innerText =
    project.description[lang];
  document.getElementById("modal-github").href = project.github;
  document.getElementById("modal-live").href = project.live;
}

document.addEventListener("DOMContentLoaded", init);
