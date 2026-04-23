/**
 * Generates the HTML for the language switcher toggle.
 * It dynamically injects the "switch-de" class and "active" states based on 
 * the current global language setting to ensure UI consistency across re-renders.
 * * @returns {string} HTML string for the language switcher component.
 */
export const getLangSwitchHTML = () => {
  const isDe = window.currentLang === 'de' ? 'switch-de' : '';
  return `
    <div class="lang-switch ${isDe}" id="lang-switch-container">
      <div class="switch-bg" id="switch-bg"></div>
      <span class="lang-option ${window.currentLang === 'en' ? 'active' : ''}" id="lang-en">EN</span>
      <span class="lang-option ${window.currentLang === 'de' ? 'active' : ''}" id="lang-de">DE</span>
    </div>
  `;
};

/**
 * Creates the standard navigation link structure.
 * This component is reused in both the desktop header and the mobile menu 
 * to maintain a "DRY" (Don't Repeat Yourself) codebase.
 * * @param {Object} lang - The translation object containing localized navigation labels.
 * @returns {string} HTML string for the navigation links.
 */
export const getNavSection = (lang) => {
  return `
    <div class="nav">
      <a href="#about" class="active">${lang.nav.linkAbout}</a>
      <a href="#skills">${lang.nav.linkSkills}</a>
      <a href="#projects">${lang.nav.linkProjects}</a>
    </div>
  `;
};

/**
 * Generates the full mobile navigation overlay.
 * This is a composite component that integrates the navigation links and 
 * the language switcher into a single mobile-friendly drawer.
 * * @param {Object} lang - The translation object for localized content.
 * @returns {string} HTML string for the complete mobile menu.
 */
export const getMobileMenu = (lang) => {
  return `
    <nav class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav-links">
        ${getNavSection(lang)} 
      </div>
      <div class="mobile-lang-wrapper">
        ${getLangSwitchHTML()} 
      </div>
    </nav>
  `;
};