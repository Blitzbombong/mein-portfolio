export const getLangSwitchHTML = () => {
  // EXAKT dein HTML-Code, damit dein CSS perfekt greift
  return `
    <div class="lang-switch">
      <div class="switch-bg" id="switch-bg"></div>
      <span class="lang-option active" id="lang-en">EN</span>
      <span class="lang-option" id="lang-de">DE</span>
    </div>
  `;
};

export const getNavSection = (lang) => {
  return `
    <div class="nav">
      <a href="#about" class="active">${lang.nav.linkAbout}</a>
      <a href="#skills">${lang.nav.linkSkills}</a>
      <a href="#projects">${lang.nav.linkProjects}</a>
    </div>
  `;
};

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