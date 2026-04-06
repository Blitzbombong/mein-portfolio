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
             w<div class="mindset-card card-right"></div>
          </div>
        </div>

        <div class="slider-nav">
          <button class="nav-btn prev">←</button>
          <div class="nav-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <button class="nav-btn next">→</button>
        </div>
      </div>
    </section>
  `;
}

export function createCardContent(title, text, tag) {
    // Hier wird NUR das Innere der Karte gebaut
    return `
        <div class="quote-icon">““</div>
        <p class="mindset-text">
            <strong>${title}:</strong> ${text}
        </p>
        <div class="mindset-footer">
            <span class="line"></span>
            <span class="mindset-tag">${tag}</span>
        </div>
    `;
}
