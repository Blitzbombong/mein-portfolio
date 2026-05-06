/**
 * Returns the HTML for the about section of the webpage.
 * This section contains information about the author, a picture of the author, and a description of the author's mindset.
 * @param {Object} lang - An object containing the translated text for the about section.
 * @returns {string} - The HTML for the about section.
 */
export const getAboutSection = (lang) => {
  return `
        <section class="section-base about-section" id="about">
            <div class="section-container">
                <div class="two-col-grid about-parent">
                    <div class="about-image" data-aos="fade-right">
                        <img src="img/walgi.webp" alt="Waldemar Giesbrecht">
                    </div>
                    <div class="about-text" data-aos="fade-left">
                        <h2 class="about-subtitle">${lang.about.aboutSubtitle}</h2>
                        <div class="about-line">
                            <h3 class="about-title">${lang.about.aboutTitle}</h3>
                            <span class="about-me">
                                ${lang.about.aboutText}
                            </span>
                            <div class="about-skills-parent">
                                <div class="about-skills">
                                    <div class="skill-child skill-child-1" data-aos="fade-up" data-aos-delay="100">
                                        <img src="assets/lokation.svg" alt="lokation">
                                        <span>${lang.about.meLokation}</span>
                                    </div>
                                    <div class="skill-child" data-aos="fade-up" data-aos-delay="200">
                                        <img src="assets/cognition.svg" alt="cognition">
                                        <span>${lang.about.mindset}</span>
                                    </div>
                                    <div class="skill-child" data-aos="fade-up" data-aos-delay="300">
                                        <img src="assets/new_releases.svg" alt="releases">
                                        <span>${lang.about.persistence}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};