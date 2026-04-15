export function getLegalSection(lang) {
    return `
    <section id="legal-view" class="legal-section" >
        <div class="legal-content">
            <button id="close-legal" class="back-button">
                <img src="icons/arrow-left.svg" alt="Close Legal View" class="back-icon" />
            </button>
            <h1 class="legal-title">${lang.legal.title}</h1>
            
            <div class="legal-block">
                <h3>${lang.legal.imprint}</h3>
                <ul>
                    <li>Waldemar Giesbrecht</li>
                    <li>Gölenkammp 35</li>
                    <li>44357 Dortmund, Germany</li>
                </ul>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.exploringTitle}</h3>
                <p>Email: winstar1@gmx.net</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.acceptanceTitle}</h3>
                <p>${lang.legal.acceptanceText}</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.scopeTitle}</h3>
                <p>${lang.legal.scopeText}</p>
                <p>${lang.legal.ownershipText}</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.rightsTitle}</h3>
                <p>${lang.legal.rightsText}</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.useTitle}</h3>
                <p>${lang.legal.useText}</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.disclaimerTitle}</h3>
                <p>${lang.legal.disclaimerText}</p>
            </div>

            <div class="legal-block">
                <h3>${lang.legal.indemnityTitle}</h3>
                <p>${lang.legal.indemnityText}</p>
                <p>${lang.legal.contactText}</p>
                <p class="legal-date">Date: July 26, 2025</p>
            </div>

        </div>
    </section>
    `;
}