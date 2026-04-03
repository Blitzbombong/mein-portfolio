export function getMindsetSection(langData) {
  const t = langData.mindset;
  return `
    <section class="mindset-section">
      <h2 class="section-title">${t.title}</h2>
      
      <div class="mindset-slider">
        <div class="mindset-track">
          <div class="mindset-card">
            <div class="quote-icon">““</div>
            <p class="mindset-text"><strong>${t.card1_title}:</strong> ${t.card1_text}</p>
            <div class="mindset-footer">
              <span class="line"></span>
              <span class="mindset-tag">${t.card1_tag}</span>
            </div>
          </div>
          <div class="mindset-card">
            <div class="quote-icon">““</div>
            <p class="mindset-text"><strong>${t.card2_title}:</strong> ${t.card2_text}</p>
            <div class="mindset-footer">
              <span class="line"></span>
              <span class="mindset-tag">${t.card2_tag}</span>
            </div>
          </div>
          <div class="mindset-card">
            <div class="quote-icon">““</div>
            <p class="mindset-text"><strong>${t.card3_title}:</strong> ${t.card3_text}</p>
            <div class="mindset-footer">
              <span class="line"></span>
              <span class="mindset-tag">${t.card3_tag}</span>
            </div>
          </div>
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
    </section>
  `;
}
