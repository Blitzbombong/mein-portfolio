const getHeroSection = (lang) => {
  return `
        <div class="hero-section">
            <div class="hero">
                <div class="hero-text">
                    <p>${lang.heroSubtitle}</p>   
                </div>
                <div class="hero-name">
                    <h1>${lang.heroTitle}</h1>
                </div>
                <div class="hero-links">
                    <a class="check-work" hreef="">
                        <div class="scroll-track">
                            <span>${lang.checkWork}</span>
                            <span>${lang.checkWork}</span>
                        </div>
                    </a>
                    <a class="contact-me" hreef="">
                        <div class="scroll-track">
                            <span>${lang.contactMe}</span>
                            <span>${lang.contactMe}</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        `;
};

const getAboutSection = (lang) => {
  return `
        <section id="about">
            <h2>Über mich</h2>
            <p>Ich bin ein motivierter Frontend-Entwickler...</p>
        </section>
    `;
};
