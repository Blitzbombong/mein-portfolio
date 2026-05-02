export function getImprintSection(lang) {
  return `
    <section id="legal-view" class="legal-section">
      <div class="legal-content">
        <button id="close-legal" class="back-button">
          <img src="assets/arrow-left.svg" alt="Close" class="back-icon" />
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

        <div class="legal-block">
          <p class="legal-date">${lang.legal.dateLabel}</p>
        </div>
      </div>
    </section>
  `;
}

export function getPrivacySection(lang) {
  return `
    <section id="legal-view" class="legal-section">
      <div class="legal-content">
        <button id="close-legal" class="back-button">
          <img src="assets/arrow-left.svg" alt="Close" class="back-icon" />
        </button>
        <h1 class="legal-title">${lang.legal.privacyTitle}</h1>

        <div class="legal-block">
          <h3>${lang.legal.privacyHeader}</h3>
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
