import { getLegalSection } from "../html/legal.js";
import { createCardContent } from "../html/mindset.js";
import { mindsetCards } from "../functions/projectsData.js";

let currentIndex = 0;

export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (validateForm()) handleFormSubmit(form);
  };

  setupInputListeners();
}

/**
 * Validates the contact form by checking all the fields are valid.
 * It checks each field individually and hides or shows an error message based on the field's validity.
 * If any field is invalid, it sets the isValid flag to false.
 * @returns {boolean} - Whether the form is valid or not.
 */
function validateForm() {
  const fields = [
    {
      id: "name",
      valid: () => document.getElementById("contact-name").value.trim() !== "",
    },
    {
      id: "email",
      valid: () => isEmailValid(document.getElementById("contact-email").value),
    },
    {
      id: "message",
      valid: () =>
        document.getElementById("contact-message").value.trim() !== "",
    },
    {
      id: "privacy",
      valid: () => document.getElementById("privacy-check").checked,
    },
  ];

  let isValid = true;
  fields.forEach((field) => {
    const isFieldOk = field.valid();
    isFieldOk ? hideError(field.id) : showError(field.id);
    if (!isFieldOk) isValid = false;
  });

  return isValid;
}

/**
 * Handles the submission of the contact form.
 * Logs a message to the console to indicate the form was submitted.
 * Displays an alert to the user to indicate that the message was received.
 * Resets the form fields to their initial state.
 * @param {HTMLFormElement} form - The HTML element of the contact form to handle.
 */
function handleFormSubmit(form) {
  console.log("Formular wird gesendet...");
  alert("Danke! Deine Nachricht wurde (simuliert) gesendet.");
  form.reset();
}

/**
 * Sets up event listeners for the input fields of the contact form.
 * When an input field is changed, it hides any error message associated with the field.
 * This function is used to setup input validation for the contact form.
 */
function setupInputListeners() {
  const inputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea",
  );
  inputs.forEach((input) => {
    input.oninput = () => {
      const id = input.id.replace("contact-", "").replace("-check", "");
      hideError(id);
    };
  });
}

/**
 * Checks if an email address is valid.
 * This function uses a regular expression to match most common email address formats.
 * @param {string} email - The email address to check.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
function isEmailValid(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Shows an error message for a contact form field.
 * It finds the error span and input field associated with the given fieldId.
 * If the error span exists, it sets its display to "block" and adds the "animate-error" class.
 * If the input field exists, it adds the "input-error-border" class.
 * @param {string} fieldId - The id of the contact form field to show an error message for.
 */
function showError(fieldId) {
  const errorSpan = document.getElementById(`error-${fieldId}`);
  const inputField = document.getElementById(`contact-${fieldId}`);

  if (errorSpan) {
    errorSpan.style.display = "block";
    errorSpan.classList.add("animate-error");
  }
  if (inputField) {
    inputField.classList.add("input-error-border");
  }
}

/**
 * Hides an error message for a contact form field.
 * It finds the error span and input field associated with the given fieldId.
 * If the error span exists, it sets its display to "none" and removes the "animate-error" class.
 * If the input field exists, it removes the "input-error-border" class.
 * @param {string} fieldId - The id of the contact form field to hide an error message for.
 */
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

/**
 * Renders the legal view section of the webpage based on the current language.
 * It gets the main content container element and the legal content container element.
 * If the legal content container element does not exist, it creates a new one and appends it to the main content container.
 * Then, it sets the innerHTML of the legal content container element to the result of calling getLegalSection with the language object.
 * Finally, it calls setupLegalLogic to set up the legal view logic.
 * @param {Object} lang - An object containing the translated text for the legal view section.
 */
export function renderLegalView(lang) {
  const mainContainer = document.getElementById("main-content");
  let legalContainer = document.getElementById("legal-content-container");

  if (!legalContainer) {
    legalContainer = document.createElement("div");
    legalContainer.id = "legal-content-container";
    mainContainer.insertAdjacentElement("afterend", legalContainer);
  }
  legalContainer.innerHTML = getLegalSection(lang);

  setupLegalLogic();
}

/**
 * Sets up the legal view logic.
 * It gets the main content container, legal content container, privacy link, and close button elements.
 * If the privacy link exists, it adds an event listener to toggle the legal view when clicked.
 * If the close button exists, it adds an event listener to toggle the legal view when clicked.
 * Finally, it calls bindLegalNavLinks to bind the legal navigation links.
 */
function setupLegalLogic() {
  const main = document.getElementById("main-content");
  const legal = document.getElementById("legal-content-container");
  const privacyLink = document.querySelector(".footer-link-privacy");
  const closeBtn = document.getElementById("close-legal");

  if (!main || !legal) return;

  if (privacyLink) {
    privacyLink.onclick = (e) => {
      e.preventDefault();
      toggleLegalView(main, legal, true);
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => toggleLegalView(main, legal, false);
  }
  bindLegalNavLinks(main, legal);
}

/**
 * Toggles the display of the legal view section and the main content section.
 * If showLegal is true, it sets the display of the main content section to "none" and the legal view section to "block".
 * If showLegal is false, it sets the display of the main content section to "block" and the legal view section to "none".
 * Finally, it scrolls the window to the top.
 * @param {HTMLElement} main - The main content section element.
 * @param {HTMLElement} legal - The legal view section element.
 * @param {boolean} showLegal - Whether to show the legal view section or not.
 */
function toggleLegalView(main, legal, showLegal) {
  main.style.display = showLegal ? "none" : "block";
  legal.style.display = showLegal ? "block" : "none";
  window.scrollTo(0, 0);
}

/**
 * Binds the legal navigation links to toggle the legal view.
 * It gets all the links in the navigation content section and adds an event listener to toggle the legal view when clicked.
 * The event listener calls the toggleLegalView function with the main content section, legal view section, and false as arguments.
 */
function bindLegalNavLinks(main, legal) {
  const navLinks = document.querySelectorAll("#nav-content a");
  navLinks.forEach((link) => {
    link.onclick = () => toggleLegalView(main, legal, false);
  });
}

/**
 * Updates the mindset slider with the new translations.
 * It loops through all the mindset cards and updates their content with the new translations.
 * It also updates the active dot in the slider navigation.
 * @param {object} langData - The translated data for the current language.
 */
export function updateSlider(langData) {
  const cards = document.querySelectorAll(".mindset-card");
  const dots = document.querySelectorAll(".dot");

  cards.forEach((card, i) => updateSingleCard(card, i, langData));
  updateDots(dots);
}

/**
 * Updates a single mindset card with the new translations.
 * It first calculates the new index of the card based on the current index and the given index.
 * Then it updates the transition of the card based on the new index.
 * It also updates the classes of the card based on the new index.
 * Finally, it fills the content of the card with the new translations.
 * @param {HTMLElement} card - The HTML element of the mindset card to update.
 * @param {number} i - The index of the mindset card to update.
 * @param {object} langData - The translated data for the current language.
 */
function updateSingleCard(card, i, langData) {
  const newPosIndex = (i - currentIndex + 3) % 3;

  handleCardTransitions(card, newPosIndex);
  updateCardClasses(card, newPosIndex);
  fillCardContent(card, i, langData.mindset);
}

/**
 * Handles the transition of a single mindset card based on its new position index.
 * If the card is jumping from one side to the other, it adds a "no-transition" class to the card
 * and removes it after a short timeout to prevent any transition from happening.
 * @param {HTMLElement} card - The HTML element of the mindset card to handle.
 * @param {number} newPosIndex - The new index of the mindset card.
 */
function handleCardTransitions(card, newPosIndex) {
  const wasLeft = card.classList.contains("pos-left");
  const wasRight = card.classList.contains("pos-right");

  const isJumping =
    (wasLeft && newPosIndex === 1) || (wasRight && newPosIndex === 2);

  if (isJumping) {
    card.classList.add("no-transition");
    setTimeout(() => card.classList.remove("no-transition"), 150);
  }
}

/**
 * Updates the classes of a mindset card based on its new position index.
 * It removes all the positions classes from the card and adds the class corresponding to the new position index.
 * @param {HTMLElement} card - The HTML element of the mindset card to update.
 * @param {number} newPosIndex - The new index of the mindset card.
 */
function updateCardClasses(card, newPosIndex) {
  const positions = ["pos-center", "pos-right", "pos-left"];
  card.classList.remove(...positions);
  card.classList.add(positions[newPosIndex]);
}

/**
 * Fills a mindset card with the content based on the new translations.
 * It takes the HTML element of the mindset card, the index of the mindset card to fill, and the translated data for the current language.
 * It uses the index to access the correct mindset card data and the translated data to fill the card with the correct content.
 * @param {HTMLElement} card - The HTML element of the mindset card to fill.
 * @param {number} i - The index of the mindset card to fill.
 * @param {object} translations - The translated data for the current language.
 */
function fillCardContent(card, i, translations) {
  const data = mindsetCards[i];
  const t = translations;

  card.innerHTML = createCardContent(
    t[`${data.langKey}_title`],
    t[`${data.langKey}_text`],
    t[`${data.langKey}_tag`],
  );
}

/**
 * Updates the active dot in the mindset slider navigation.
 * It loops through all the dots and toggles the "active" class on each dot based on whether its index matches the current index.
 * @param {NodeList} dots - The list of HTML elements representing the dots in the slider navigation.
 */
function updateDots(dots) {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

/**
 * Sets up the events for the mindset slider.
 * It queries the next and previous buttons and sets their onclick events to change the mindset card.
 * @param {object} allTranslations - An object containing all the translations for each language.
 * @param {string} currentLang - The current language to use for the translations.
 */
export function setupMindsetEvents(allTranslations, currentLang) {
  const nextBtn = document.querySelector(".mindset-section .next");
  const prevBtn = document.querySelector(".mindset-section .prev");

  if (nextBtn) {
    nextBtn.onclick = () => changeMindset(1, allTranslations, currentLang);
  }
  if (prevBtn) {
    prevBtn.onclick = () => changeMindset(-1, allTranslations, currentLang);
  }
}

/**
 * Changes the current mindset card based on the given step.
 * It updates the currentIndex variable based on the given step and the total number of cards.
 * It then calls updateSlider with the language object to update the mindset section.
 * @param {number} step - The step to move the mindset card (1 for next, -1 for previous).
 * @param {object} allTranslations - An object containing all the translations for each language.
 * @param {string} currentLang - The current language to use for the translations.
 */
function changeMindset(step, allTranslations, currentLang) {
  const totalCards = 3;
  const lang = allTranslations[currentLang];
  currentIndex = (currentIndex + step + totalCards) % totalCards;

  updateSlider(lang);
}
