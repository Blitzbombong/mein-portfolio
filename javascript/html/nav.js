export const getNavSection = (lang) => {
  return `
       <div class="nav">
          <a href="#about" class="active">${lang.nav.linkAbout}</a>
          <a href="#skills">${lang.nav.linkSkills}</a>
          <a href="#projects">${lang.nav.linkProjects}</a>
        </div>
    `;
};