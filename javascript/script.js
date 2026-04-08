import { getNavSection } from "./html/nav.js";
import { getHeroSection } from "./html/hero.js";
import { getAboutSection } from "./html/about.js";
import { getSkillsSection } from "./html/skills.js";
import { getPortfolioSection } from "./html/portfolio.js";
import { myProjects } from "./functions/projectsData.js";
import { renderTechIcons } from "./html/portfolio.js";
import { getMindsetSection } from "./html/mindset.js";
import { mindsetCards } from "./functions/projectsData.js";
import { createCardContent } from "./html/mindset.js";
import { getContactSection } from "./html/contact.js";

let currentLang = "en";
let allTranslations = {};
let currentProjectIndex = 0;
let currentIndex = 0;

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
    initContactForm();
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
    getPortfolioSection(lang) +
    getMindsetSection(lang) +
    getContactSection(lang);
  updateSlider(lang);
  setupMindsetEvents();
}

function setupProjectHovers() {
  const projectItems = document.querySelectorAll(".project-item");
  const previewContainer = document.querySelector(".project-preview-container");
  const previewFrame = document.querySelector(".image-frame");
  const previewImg = document.getElementById("project-preview-img");

  if (!previewContainer || !previewFrame || !previewImg) return;

  projectItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      const imagePath = myProjects[index].image;

      if (imagePath) {
        // 1. Bildquelle sofort setzen
        previewImg.src = imagePath;

        // 2. Positions-Klasse sofort umschalten
        previewContainer.classList.remove(
          "align-top",
          "align-center",
          "align-bottom",
        );

        if (index === 0) previewContainer.classList.add("align-top");
        else if (index === 1) previewContainer.classList.add("align-center");
        else if (index === 2) previewContainer.classList.add("align-bottom");

        // 3. Sichtbarkeit einschalten
        previewFrame.classList.add("visible");
      }
    });

    item.addEventListener("mouseleave", () => {
      previewFrame.classList.remove("visible");
    });
  });
}

function setupProjectClicks() {
  const projectItems = document.querySelectorAll(".project-item");
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  const nextBtn = document.getElementById("next-project-btn");

  projectItems.forEach((item, index) => {
    item.onclick = () => {
      currentProjectIndex = index; // Position speichern
      openModal(currentProjectIndex);
    };
  });

  window.addEventListener("click", (event) => {
    const modal = document.getElementById("project-modal");

    // Wir prüfen: Ist das Element, das angeklickt wurde (event.target),
    // genau unser dunkles Overlay-Element?
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Schließen-Logik
  closeBtn.onclick = () => (modal.style.display = "none");

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
  const modal = document.getElementById("project-modal");

  // Wir rufen unsere Spezialisten auf
  updateModalContent(project, index);
  renderTechIcons(project.icons);
  updateModalImage(project.image);

  modal.style.display = "flex";
}

function updateModalImage(imageSrc) {
  const modalImg = document.getElementById("modal-img");
  modalImg.style.opacity = "0"; // Sofort ausblenden

  setTimeout(() => {
    modalImg.src = imageSrc;
    modalImg.onload = () => {
      modalImg.style.opacity = "1"; // Erst einblenden, wenn geladen
    };
  }, 50);
}

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

export function updateSlider(langData) {
  const cards = document.querySelectorAll(".mindset-card");
  const dots = document.querySelectorAll(".dot");
  const t = langData.mindset;

  cards.forEach((card, i) => {
    // 1. Wir berechnen die NEUE Position
    const newPosIndex = (i - currentIndex + 3) % 3;

    // 2. Wir prüfen, welche Position die Karte VORHER hatte
    // (Das finden wir heraus, indem wir schauen, welche Klasse sie gerade noch hat)
    const wasLeft = card.classList.contains("pos-left");
    const wasRight = card.classList.contains("pos-right");

    // 3. LOGIK-CHECK für den Teleport:
    // Wenn sie von Links nach Rechts springt (oder andersrum), ohne durch die Mitte zu gehen
    const isJumping =
      (wasLeft && newPosIndex === 1) || (wasRight && newPosIndex === 2);

    if (isJumping) {
      card.classList.add("no-transition");
    }

    // 4. Klassen wie gewohnt tauschen
    card.classList.remove("pos-left", "pos-center", "pos-right");

    if (newPosIndex === 0) card.classList.add("pos-center");
    else if (newPosIndex === 1) card.classList.add("pos-right");
    else card.classList.add("pos-left");

    // 5. Kurze Verzögerung, dann die Animation wieder erlauben
    // (Wir nutzen ein minimales Timeout, damit der Browser den Teleport ohne Animation ausführt)
    setTimeout(() => {
      card.classList.remove("no-transition");
    }, 150); // 50ms reichen völlig aus

    // Inhalt füllen (dein createCardContent Aufruf...)
    const data = mindsetCards[i];
    card.innerHTML = createCardContent(
      t[data.langKey + "_title"],
      t[data.langKey + "_text"],
      t[data.langKey + "_tag"],
    );
  });

  dots.forEach((dot, index) => {
    // Wir entfernen erst bei allen die 'active' Klasse
    dot.classList.remove("active");

    // Wenn der Index des Dots dem currentIndex entspricht, machen wir ihn aktiv
    if (index === currentIndex) {
      dot.classList.add("active");
    }
  });
}

function setupMindsetEvents() {
  const nextBtn = document.querySelector(".mindset-section .next");
  const prevBtn = document.querySelector(".mindset-section .prev");
  const lang = allTranslations[currentLang];

  if (nextBtn) {
    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % 3; // Nächste Karte
      updateSlider(lang);
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + 3) % 3; // Vorherige Karte
      updateSlider(lang);
    };
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Verhindert, dass die Seite neu lädt

    let isValid = true;

    // 1. Felder greifen
    const name = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const message = document.getElementById("contact-message");
    const privacy = document.getElementById("privacy-check");

    // 2. Validierungs-Check
    if (name.value.trim() === "") {
      showError("name");
      isValid = false;
    } else {
      hideError("name");
    }

    if (!validateEmail(email.value)) {
      showError("email");
      isValid = false;
    } else {
      hideError("email");
    }

    if (message.value.trim() === "") {
      showError("message");
      isValid = false;
    } else {
      hideError("message");
    }

    if (!privacy.checked) {
      showError("privacy");
      isValid = false;
    } else {
      hideError("privacy");
    }

    // 3. Wenn alles okay ist
    if (isValid) {
      console.log("Formular wird gesendet...");
      alert("Danke! Deine Nachricht wurde (simuliert) gesendet.");
      form.reset(); // Formular leeren
    }
  });

  // Hilfsfunktion für Email-Check (RegEx - Standard für Entwickler)
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }

  // In deiner initContactForm()
  const inputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea",
  );
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const fieldId = input.id.replace("contact-", "");
      hideError(fieldId); // Fehler verschwindet sofort beim Tippen!
    });
  });
}

function showError(fieldId) {
  const errorSpan = document.getElementById(`error-${fieldId}`);
  const inputField = document.getElementById(`contact-${fieldId}`);

  if (errorSpan) {
    errorSpan.style.display = "block";
    // Wir fügen eine CSS-Klasse für die Schüttel-Animation hinzu
    errorSpan.classList.add("animate-error");
  }

  if (inputField) {
    inputField.classList.add("input-error-border");
  }
}

function hideError(fieldId) {
  const errorSpan = document.getElementById(`error-${fieldId}`);
  const inputField = document.getElementById(`contact-${fieldId}`);

  if (errorSpan) {
    errorSpan.style.display = "none";
    errorSpan.classList.remove("animate-error");
  }

  if (inputField) {
    inputField.classList.remove("input-error-border");
  }
}

document.addEventListener("DOMContentLoaded", init);
