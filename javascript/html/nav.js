/**
 * Returns the HTML for the navigation section of the webpage.
 * This section contains links to the about, skills, and projects sections.
 * @param {Object} lang - An object containing the translated text for the navigation section.
 * @returns {string} - The HTML for the navigation section.
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