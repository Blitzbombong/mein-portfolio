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

            <div class="side-bar side-left">
                <div class="scroll-down">
                    <img src="icons/arrow-down.svg" alt="Arrow-down" class="arrow-1">
                    <img src="icons/arrow-down.svg" alt="Arrow-down" class="arrow-2">
                </div>
            <div class="v-line-left"></div></div>

            <div class="side-bar side-right">
                <a href="mailto:walgi@email.de" class="side-email">walgi@email.de</a>
                    <div class="side-socials">
                        <a href="#"><img src="icons/github1.svg" alt="GitHub"></a>
                        <a href="#"><img src="icons/linkedin1.svg" alt="LinkedIn"></a>
                    </div>
                <div class="v-line-right"></div>
            </div>

            <div class="billboard-container"> <div class="billboard-ticker"> <div class="billboard-track">
                <span>Available for remote work</span>
                <span class="sep">•</span>
                <span>Frontend Developer</span>
                <span class="sep">•</span>
                <span>Based in Dortmund</span>
                <span class="sep">•</span>
                <span>Open to work</span>

                <span class="sep">•</span>
                <span>Available for remote work</span>
                <span class="sep">•</span>
                <span>Frontend Developer</span>
                <span class="sep">•</span>
                <span>Based in Dortmund</span>
                <span class="sep">•</span>
                <span>Open to work</span>
            </div>
            </div>
            </div>
        </div>
        `;
};

const getAboutSection = (lang) => {
  return `
        <section class="about-section" id="about">
            <h2>Über mich</h2>
            <p>Ich bin ein motivierter Frontend-Entwickler...</p>
        </section>
    `;
};
