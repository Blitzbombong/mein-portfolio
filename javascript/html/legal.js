/**
 * Returns the HTML for the legal view section of the webpage.
 * This section contains all the important legal information such as imprint, acceptance, scope, ownership, rights, use, disclaimer, and indemnity.
 * @param {Object} lang - An object containing the translated text for the legal view section.
 * @returns {string} - The HTML for the legal view section.
 */
export function getLegalSection(lang) {
  return `
    <section id="legal-view" class="legal-section">
        <div class="legal-content">
            <button id="close-legal" class="back-button">
                <img src="icons/arrow-left.svg" alt="Close Legal View" class="back-icon" />
            </button>
            <h1 class="legal-title">${lang.legal.title}</h1>
            
            <div class="legal-block">
                <h3>${lang.legal.imprintTitle}</h3>
                <ul>
                    <li>Waldemar Giesbrecht</li>
                    <li>Göllenkamp 35</li>
                    <li>44357 Dortmund</li>
                </ul>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.contactTitle}</h3>
                <p>Email: winstar1@gmx.net</p>
            </div>

            <h1 class="legal-title">${lang.legal.privacyTitle}</h1>

            <div class="legal-block">
                <h3>${lang.legal.privacyTitle}</h3>
                <p>${lang.legal.privacyShort}</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.hostingTitle}</h3>
                <p>${lang.legal.hostingText}</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.generalTitle}</h3>
                <p>${lang.legal.generalInfo}</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.dataTitle}</h3>
                <p>${lang.legal.dataCollection}</p>
            </div>

            <div class="legal-block">
                <p class="legal-date">${lang.legal.sourceNote}</p>
                <p class="legal-date">${lang.legal.dateLabel}</p>
            </div>

        </div>
    </section>
    `;
}
