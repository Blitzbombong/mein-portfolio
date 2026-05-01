import { getLegalSection } from "../html/legal.js";
import { createCardContent } from "../html/mindset.js";
import { mindsetCards } from "../functions/projectsData.js";

let currentIndex = 0;

/**
 * Initializes the contact form by attaching the submit event listener and setting up input validation.
 * It prevents the default form submission, runs a full validation check,
 * and proceeds with the form submission logic only if all fields are valid.
 * * @returns {void}
 */
export function initContactForm(i18n) {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (validateForm()) handleFormSubmit(form, i18n);
  };
  setupInputListeners();
}

/**
 * Orchestrates the form validation process.
 * It gathers all validation rules, triggers UI updates for each field,
 * and determines if the entire form is ready for submission.
 * * @returns {boolean} True if every field passes its validation check, otherwise false.
 */
function validateForm() {
  const fields = getValidationFields();
  return fields.map(checkAndUI).every((isValid) => isValid === true);
}

/**
 * Provides the configuration for all fields to be validated.
 * Each object contains a unique ID and a rule-based check function.
 * * @returns {Array<{id: string, check: function(): boolean}>} An array of field validation objects.
 */
function getValidationFields() {
  return [
    {
      id: "name",
      check: () => document.getElementById("contact-name").value.trim() !== "",
    },
    {
      id: "email",
      check: () => isEmailValid(document.getElementById("contact-email").value),
    },
    {
      id: "message",
      check: () =>
        document.getElementById("contact-message").value.trim() !== "",
    },
    {
      id: "privacy",
      check: () => document.getElementById("privacy-check").checked,
    },
  ];
}

/**
 * Validates a single field and synchronizes the UI state.
 * It calls the field's specific check function and toggles error visibility accordingly.
 * * @param {{id: string, check: function(): boolean}} field - The field configuration object.
 * @returns {boolean} The result of the individual field validation.
 */
function checkAndUI(field) {
  const isFieldOk = field.check();
  isFieldOk ? hideError(field.id) : showError(field.id);
  return isFieldOk;
}

/**
 * Orchestrates the contact form submission process.
 * Coordinates data collection, UI loading states, network requests, and response handling.
 *
 * @async
 * @param {HTMLFormElement} form - The contact form element to be processed.
 * @param {Object} i18n - The translation object containing localized strings.
 * @returns {Promise<void>}
 */
export async function handleFormSubmit(form, i18n) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const formData = getFormData();

  toggleLoadingState(submitBtn, true, i18n);

  try {
    const result = await sendMailData(formData);
    handleServerResponse(result, form, i18n);
  } catch (error) {
    console.error("Versandfehler:", error);
    showToast(i18n.form.error_technical, "error"); // ← statt alert
  } finally {
    toggleLoadingState(submitBtn, false, i18n);
  }
}

/**
 * Handles the final result of the server communication.
 * Alerts the user of success or failure and resets the form on successful submission.
 *
 * @param {Object} result - The response object returned from the server.
 * @param {boolean} result.success - Indicates if the email was sent successfully.
 * @param {string} [result.error] - Optional error message provided by the backend.
 * @param {HTMLFormElement} form - The form element to be reset upon success.
 * @param {Object} i18n - The translation object for localized alert messages.
 * @returns {void}
 */
function handleServerResponse(result, form, i18n) {
  if (result.success) {
    showToast(i18n.form.success, "success");
    form.reset();
  } else {
    const errorMsg = result.error || i18n.form.error_unknown;
    showToast(i18n.form.error_technical, "error");
  }
}

export function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Collects and structures data from the contact form inputs.
 *
 * @returns {Object} An object containing the user's name, email, and message.
 */
function getFormData() {
  return {
    name: document.getElementById("contact-name").value,
    email: document.getElementById("contact-email").value,
    message: document.getElementById("contact-message").value,
  };
}

/**
 * Toggles the loading state of the submission button.
 * Disables the button and updates its text to provide visual feedback during the request.
 *
 * @param {HTMLButtonElement|null} button - The button element to be toggled.
 * @param {boolean} isLoading - True if the process is active, false to return to default state.
 * @returns {void}
 */
function toggleLoadingState(button, isLoading, i18n) {
  if (!button) return;
  button.disabled = isLoading;
}

/**
 * Communicates with the PHP backend to send the email data.
 *
 * @async
 * @param {Object} data - The structured form data to be sent.
 * @throws {Error} Throws an error if the server response is not successful.
 * @returns {Promise<Object>} The parsed JSON response from the server.
 */
async function sendMailData(data) {
  const response = await fetch("php/contact.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Server-Antwort war nicht ok");
  return await response.json();
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
  if (fieldId === "privacy") {
    const container = document.querySelector(".privacy-container");
    if (container) container.classList.add("has-error");
    return;
  }

  const errorSpan = document.getElementById(`error-${fieldId}`);
  const inputField = document.getElementById(`contact-${fieldId}`);

  if (errorSpan) {
    errorSpan.classList.add("animate-error");
    errorSpan.onclick = () => errorSpan.classList.remove("animate-error");
  }
  if (inputField) inputField.classList.add("input-error-border");
}

/**
 * Hides an error message for a contact form field.
 * It finds the error span and input field associated with the given fieldId.
 * If the error span exists, it sets its display to "none" and removes the "animate-error" class.
 * If the input field exists, it removes the "input-error-border" class.
 * @param {string} fieldId - The id of the contact form field to hide an error message for.
 */
function hideError(fieldId) {
  if (fieldId === "privacy") {
    const container = document.querySelector(".privacy-container");
    if (container) container.classList.remove("has-error");
    return;
  }

  const errorSpan = document.getElementById(`error-${fieldId}`);
  const inputField = document.getElementById(`contact-${fieldId}`);

  if (errorSpan) errorSpan.classList.remove("animate-error");
  if (inputField) inputField.classList.remove("input-error-border");
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
 * Sets up the legal view logic for the webpage.
 * It gets the main content container element and the legal content container element.
 * It calls initLegalOpeners, initLegalClosers, and bindLegalNavLinks to set up the legal view logic.
 */
function setupLegalLogic() {
  const main = document.getElementById("main-content");
  const legal = document.getElementById("legal-content-container");

  if (!main || !legal) return;

  initLegalOpeners(main, legal);
  initLegalClosers(main, legal);
  bindLegalNavLinks(main, legal);
}

function initLegalOpeners(main, legal) {
  const openers = [
    { sel: ".footer-link-privacy", stop: false },
    { sel: "#open-privacy", stop: true },
  ];

  openers.forEach(({ sel, stop }) => {
    const el = document.querySelector(sel);
    if (el) {
      el.onclick = (e) => {
        e.preventDefault();
        if (stop) e.stopPropagation();
        toggleLegalView(main, legal, true);
      };
    }
  });
}

/**
 * Initializes the closing of the legal view section when the close button is clicked.
 * It gets the close button element and adds an event listener to toggle the legal view section when clicked.
 * @param {HTMLElement} main - The main content section element.
 * @param {HTMLElement} legal - The legal view section element.
 */
function initLegalClosers(main, legal) {
  const closeBtn = document.getElementById("close-legal");
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.preventDefault();
      toggleLegalView(main, legal, false);
    };
  }
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
export function setupMindsetEvents() {
  const nextBtn = document.querySelector(".mindset-section .next");
  const prevBtn = document.querySelector(".mindset-section .prev");

  if (nextBtn) {
    nextBtn.onclick = () => changeMindset(1);
  }
  if (prevBtn) {
    prevBtn.onclick = () => changeMindset(-1);
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
function changeMindset(step) {
  const totalCards = 3;
  const langData = window.allTranslations[window.currentLang];

  if (!langData) {
    console.error("Übersetzungen noch nicht bereit!");
    return;
  }

  currentIndex = (currentIndex + step + totalCards) % totalCards;
  updateSlider(langData);
}
