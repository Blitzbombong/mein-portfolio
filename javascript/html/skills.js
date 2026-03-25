import { mySkills } from '../functions/skillsData.js'; 

// 2. LOGIK: Wir erstellen den HTML-String für das Grid direkt hier.
// Wir speichern das Ergebnis in der Variable 'skillItemsHtml'
export const skillItemsHtml = mySkills.map(skill => `
    <div class="skill-item ${skill.special ? 'is-special' : ''}">
        ${skill.special ? `
            <div class="skill-tooltip">
                <p>${skill.tooltipTitle}</p>
                <div class="tooltip-icons">
                    ${skill.extraIcons.map(extra => `
                        <div class="extra-icon-box">
                            <img src="${extra.icon}" alt="${extra.name}">
                            <span>${extra.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        <div class="icon-wrapper">
            <img src="${skill.icon}" alt="${skill.name}">
        </div>
        <span class="main-label">${skill.name}</span>
    </div>
`).join('');

// 3. HAUPTFUNKTION: Diese Funktion wird von der script.js aufgerufen
export const getSkillsSection = (lang) => {
    return `
        <section class="skills-section" id="skills">
            <div class="skills-container">
                <h2 class="skills-title">${lang.skillSet.skillsTitle}</h2>
                <div class="skills-parent">
                    <h3 class="skills-subtitle">${lang.skillSet.skillsSubtitle}</h3>
                    <span class="skills-text">
                        ${lang.skillSet.skillsIntro}
                    </span>
                    <h3 class="skill-query">
                        ${lang.skillSet.ctaPart1} <span>${lang.skillSet.ctaPart2}</span>
                    </h3>
                    <span class="skills-text">
                        ${lang.skillSet.ctaText}
                    </span>
                    <div class="contact-me-parent">
                        <a class="contact-me-btn" href="">
                            <div class="scroll-btn">
                                <span>${lang.skillSet.ctaLink}</span>
                                <span>${lang.skillSet.ctaLink}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="skills-grid">
                ${skillItemsHtml}
            </div>
        </section>
    `;
};