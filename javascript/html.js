const getNavSection = (lang) => {
  return `
       <div class="nav">
          <a href="" class="active">${lang.nav.linkAbout}</a>
          <a href="">${lang.nav.linkSkills}</a>
          <a href="">${lang.nav.linkProjects}</a>
        </div>
    `;
};

const getHeroSection = (lang) => {
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
                    <a class="check-work" hreef="">
                        <div class="scroll-track">
                            <span>${lang.hero.checkWork}</span>
                            <span>${lang.hero.checkWork}</span>
                        </div>
                    </a>
                    <a class="contact-me" hreef="">
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
                <a href="mailto:walgi@email.de" class="side-email">walgi@email.de</a>
                    <div class="side-socials">
                        <a href="#"><img src="icons/github1.svg" alt="GitHub"></a>
                        <a href="#"><img src="icons/linkedin1.svg" alt="LinkedIn"></a>
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
                        <span>${lang.hero.status}</span><span class="sep">•</span>
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
                        <span>${lang.hero.status}</span><span class="sep">•</span>
                        <span>${lang.hero.developer}</span><span class="sep">•</span>
                        <span>${lang.hero.location}</span><span class="sep">•</span>
                        <span>${lang.hero.status}</span><span class="sep">•</span>
                    </div>
                </div>
            </div>
        </div>
        `;
};

const getAboutSection = (lang) => {
  return `
        <section class="about-section" id="about">
            <div class="about-container">
                <div class="about-parent">
                    <div class="about-image">
                        <img src="img/walgi.png" alt="Waldemar Giesbrecht">
                    </div>
                    <div class="about-text">
                        <p class="about-subtitle">${lang.about.aboutSubtitle}</p></p>
                        <div class="about-line">
                            <h2 class="about-title">${lang.about.aboutTitle}</h2>
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
