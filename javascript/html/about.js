export const getAboutSection = (lang) => {
  return `
        <section class="about-section" id="about">
            <div class="about-container">
                <div class="about-parent">
                    <div class="about-image">
                        <img src="img/walgi.png" alt="Waldemar Giesbrecht">
                    </div>
                    <div class="about-text">
                        <h2 class="about-subtitle">${lang.about.aboutSubtitle}</h2>
                        <div class="about-line">
                            <h3 class="about-title">${lang.about.aboutTitle}</h3>
                            <span class="about-me">
                                ${lang.about.aboutText}
                            </span>
                            <div class="about-skills-parent">
                                <div class="about-skills">
                                    <div class="skill-child skill-child-1">
                                        <img src="icons/lokation.svg" alt="lokation">
                                        <span>${lang.about.meLokation}</span>
                                    </div>
                                    <div class="skill-child">
                                        <img src="icons/cognition.svg" alt="cognition">
                                        <span>${lang.about.mindset}</span>
                                    </div>
                                    <div class="skill-child">
                                        <img src="icons/new_releases.svg" alt="releases">
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