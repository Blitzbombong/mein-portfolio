export const getNavSection = (lang) => {
  return `
       <div class="nav">
          <a href="" class="active">${lang.nav.linkAbout}</a>
          <a href="">${lang.nav.linkSkills}</a>
          <a href="">${lang.nav.linkProjects}</a>
        </div>
    `;
};