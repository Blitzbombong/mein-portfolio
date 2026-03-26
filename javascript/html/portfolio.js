import { myProjects } from "../functions/projectsData.js";

const formatTechStack = (techString) => {
    return techString.split(' | ').join(' <span class="pipe">|</span> ');
}; 

export const getPortfolioSection = (lang) => {
    const projectItemsHtml = myProjects.map(project => `
        <div class="project-item">
            <div class="project-row">
                <div class="project-title-wrapper">
                    <h3 class="project-name">${project.name}</h3>
                    <span class="hover-arrow">↗</span>
                </div>
                <span class="project-tech">
                    ${formatTechStack(project.techStack)} </span>
            </div>
            <div class="project-divider"></div>
        </div>
    `).join('');
    return `
        <section class="projects-section" id="projects">
            <div class="projects-container">
                <div class="projects-parent">
                    <h2 class="portfolio-title">
                        ${lang.portfolio.portfolioTitle}
                    </h2>
                    <div class="portfolio-line">
                        <h3 class="featured-title">
                            ${lang.portfolio.portfolioSubtitle}
                        </h3>
                        <span class="featured-text">
                            ${lang.portfolio.portfolioText}
                        </span>
                    </div>
                    <div class="projects-list">
                        <div class="project-divider"></div>
                        ${projectItemsHtml}
                    </div>
                </div>
            </div>
        </section>
    `;
};