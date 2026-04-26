/**
 * Generates the HTML markup for the hero section.
 * This template constructs the initial landing view, including the main titles,
 * interactive call-to-action links with scrolling tracks, side navigation bars
 * with social media links, and a continuous scrolling ticker (billboard).
 * * @param {Object} lang - The translation object containing localized strings for the hero section elements.
 * @returns {string} A template literal string containing the complete hero section HTML.
 */
export const getHeroSection = (lang) => {
  return `
        <div class="hero-section">
            <div class="hero">
                <div class="hero-text">
                    <p>${lang.hero.heroSubtitle}</p>   
                </div>
                <div class="hero-name">
                    <h1>${lang.hero.heroTitle}</h1>
                </div>
                <div class="hero-links">
                    <a class="check-work" href="#projects">
                        <div class="scroll-track">
                            <span>${lang.hero.checkWork}</span>
                            <span>${lang.hero.checkWork}</span>
                        </div>
                    </a>
                    <a class="contact-me" href="#contact">
                        <div class="scroll-track">
                            <span>${lang.hero.contactMe}</span>
                            <span>${lang.hero.contactMe}</span>
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
                <a href="#contact" class="side-email">winstar1@gmx.net</a>
                    <div class="side-socials">
                        <a href="#contact" class="side-email-icon"><img src="icons/icon-contact.svg" alt="Email"></a>
                        <a href="https://github.com/Blitzbombong?tab=repositories" target="_blank" 
                            rel="noopener noreferrer"><img src="icons/github1.svg" alt="GitHub"></a>
                        <a href="https://www.linkedin.com/in/waldemar-giesbrecht-0990a723b" target="_blank" 
                            rel="noopener noreferrer"><img src="icons/linkedin1.svg" alt="LinkedIn"></a>
                    </div>
                <div class="v-line-right"></div>
            </div>

            <div class="billboard-track">
                <div class="ticker-inner">
                    <div class="ticker-item">
                        <span>${lang.hero.remote}</span><span class="sep">•</span>
                        <span>${lang.hero.developer}</span><span class="sep">•</span>
                        <span>${lang.hero.location}</span><span class="sep">•</span>
                        <span>${lang.hero.status}</span><span class="sep">•</span>
                    </div>
                    <div class="ticker-item">
                        <span>${lang.hero.remote}</span><span class="sep">•</span>
                        <span>${lang.hero.developer}</span><span class="sep">•</span>
                        <span>${lang.hero.location}</span><span class="sep">•</span>
                        <span>${lang.hero.status}</span><span class="sep">•</span>
                    </div>
                    <div class="ticker-item">
                        <span>${lang.hero.remote}</span><span class="sep">•</span>
                        <span>${lang.hero.developer}</span><span class="sep">•</span>
                        <span>${lang.hero.location}</span><span class="sep">•</span>
                        <span>${lang.hero.status}</span><span class="sep">•</span>
                    </div>
                    <div class="ticker-item">
                        <span>${lang.hero.remote}</span><span class="sep">•</span>
                        <span>${lang.hero.developer}</span><span class="sep">•</span>
                        <span>${lang.hero.location}</span><span class="sep">•</span>
                        <span>${lang.hero.status}</span><span class="sep">•</span>
                    </div>
                </div>
            </div>
        </div>
        `;
};
