/**
 * Returns the HTML for the footer section of the webpage.
 * @param {Object} lang - An object containing the translated text for the footer section.
 * @returns {string} - The HTML for the footer section.
 */
export function getFooterSection(lang) {
  return `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-left">
            <div class="logo-container">
                <img
                src="icons/logo_1.svg"
                alt="Waldemar Giesbrecht Logo (Full)"
                class="logo-image logo-solid"
                />

                <img
                src="icons/logo_2.svg"
                alt="Waldemar Giesbrecht Logo (Outline)"
                class="logo-image logo-outline"
                />
            </div>
            <div class="info-container">
                <p class="info-title">Web Developer</p>
                <p class="info-title">Dortmund Germany</p>
            </div>
        </div>
        <div class="footer-center">
          <p class="footer-text">© Waldemar Giesbrecht 2026</p>
        </div>
        <div class="footer-right">
          <a href="https://github.com/Blitzbombong?tab=repositories" class="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/waldemar-giesbrecht-0990a723b/" class="footer-link" target="_blank" rel="noopener noreferrer">Linkedin</a>
          <a href="#contact" class="footer-link">Email</a>
          <a href="#" class="footer-link footer-link-privacy">Legal Notice</a>
      </div>
    </footer>    
  `;
}
