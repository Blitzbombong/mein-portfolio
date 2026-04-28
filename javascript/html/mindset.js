/**
 * Returns a HTML block for the mindset section.
 * @param {object} langData - The translated data for the current language.
 * @returns {string} - A HTML block for the mindset section.
 */
export function getMindsetSection(langData) {
  const t = langData.mindset;
  return `
    <section class="mindset-section">
      <div class="mindset-container">
        <h2 class="section-title">${t.title}</h2>
      
        <div class="mindset-slider">
          <div class="mindset-track" id="mindset-track">
            <div class="mindset-card card-left"></div>
            <div class="mindset-card card-center"></div>
              <div class="mindset-card card-right"></div>
          </div>
        </div>

        <div class="slider-nav">
          <button class="nav-btn prev">
            <img src="assets/arrow-left.svg" alt="Previous">
          </button>
          <div class="nav-dots">
            <span class="dot active">
              <img src="assets/dots.svg" alt="Active">
            </span>
            <span class="dot">
              <img src="assets/dots.svg" alt="Dot">
            </span>
            <span class="dot">
              <img src="assets/dots.svg" alt="Dot">
            </span>
          </div>
          <button class="nav-btn next">
            <img src="assets/arrow-right.svg" alt="Next">
          </button>
        </div>
      </div>
    </section>
  `;
}

/**
 * Creates a HTML block for the mindset section card content.
 * @param {string} title - The title of the card content.
 * @param {string} text - The text of the card content.
 * @param {string} tag - The tag text of the card content.
 * @returns {string} - A HTML block for the mindset section card content.
 */
export function createCardContent(title, text, tag) {
    return `
        <div class="quote-icon">
            <img src="assets/quotes.svg" alt="Quote">
        </div>
        <p class="mindset-text">
            <strong>${title}:</strong> ${text}
        </p>
        <div class="mindset-footer">
            <span class="line"></span>
            <span class="mindset-tag">${tag}</span>
        </div>
    `;
}
