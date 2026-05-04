/**
 * Returns the HTML for the contact section of the webpage.
 * This section contains a form to send a message to the author.
 * @param {Object} langData - An object containing the translated text for the contact section.
 * @returns {string} - The HTML for the contact section.
 */
export function getContactSection(langData) {
  const t = langData.contact;
  
  return `
    <section class="contact-section" id="contact">
      <div class="contact-container">
        
        <div class="contact-info">
          <span class="contact-subtitle">${t.subtitle}</span>
          <h1 class="contact-title">${t.title}</h1>
          
          <div class="contact-problem-box">
            <h3 class="contact-problem-title">${t.problemTitle}</h3>
            <p class="contact-description">${t.description}</p>
            <p class="contact-cta">
              ${t.ctaText} <a href="#contact" class="cta-link">${t.ctaLink}</a>
            </p>
          </div>
        </div>

        <form class="contact-form" id="contact-form" novalidate>
          
          <div class="input-group" id="group-name">
            <label for="contact-name">${t.labelName}</label>
            <input type="text" id="contact-name" name="name" placeholder="${t.placeholderName}">
            <span class="error-message d-none" id="error-name">${t.errorName}</span>
          </div>

          <div class="input-group" id="group-email">
            <label for="contact-email">${t.labelEmail}</label>
            <input type="email" id="contact-email" name="email" placeholder="${t.placeholderEmail}">
            <span class="error-message d-none" id="error-email">${t.errorEmail}</span>
          </div>

          <div class="input-group" id="group-message">
            <label for="contact-message">${t.labelMessage}</label>
            <textarea id="contact-message" name="message" rows="1" placeholder="${t.placeholderMessage}"></textarea>
            <span class="error-message d-none" id="error-message">${t.errorMessage}</span>
          </div>

          <div class="privacy-container">
            <div class="privacy-wrapper">
                <input type="checkbox" id="privacy-check" name="privacy">
                <label class="privacy-label" for="privacy-check">
                    ${t.privacyNotePart1}
                    <span class="privacy-link" id="open-privacy">${t.privacyLinkText}</span>
                    ${t.privacyNotePart2}
                </label>
            </div>
          </div>

          <div class="form-footer">
            <button type="submit" class="submit-btn" id="submit-btn">
              <div class="scroll-track-contact">
                <span>${t.sendButton}</span>
                <span>${t.sendButton}</span>
              </div>
            </button>
          </div>

        </form>
      </div>
    </section>
  `;
}