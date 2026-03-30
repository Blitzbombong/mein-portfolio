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
                    ${formatTechStack(project.techStack)}
                </span>
            </div>
            <div class="project-divider"></div>
        </div>
    `).join('');

    return `
        <section class="projects-section" id="projects">
            <div class="projects-container">
                <div class="projects-parent">
                    <h2 class="portfolio-title">${lang.portfolio.portfolioTitle}</h2>
                    <div class="portfolio-line">
                        <h3 class="featured-title">${lang.portfolio.portfolioSubtitle}</h3>
                        <span class="featured-text">${lang.portfolio.portfolioText}</span>
                    </div>

                    <div class="projects-content-flex">
                        <div class="projects-list">
                            <div class="project-divider"></div> ${projectItemsHtml}
                        </div>

                        <div class="project-preview-container">
                            <div class="image-frame">
                                <img id="project-preview-img" src="" alt="Project Preview">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="project-modal" class="modal-overlay">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    
                    <div class="modal-flex-container">
                        <div class="modal-left">
                            <span id="modal-number" class="project-number">01</span>
                            <h2 id="modal-title" class="modal-project-title">Join</h2>
                            
                            <h3 class="modal-question">What is this project about?</h3>
                            <p id="modal-description" class="modal-text"></p>
                            
                            <div id="modal-tech-icons" class="modal-tech-icons">
                                </div>
                            
                            <div class="modal-buttons">
                                <a id="modal-github" href="#" target="_blank" class="btn-outline">GitHub ↗</a>
                                <a id="modal-live" href="#" target="_blank" class="btn-outline">Live Test ↗</a>
                            </div>
                        </div>

                        <div class="modal-right">
                            <div class="modal-img-wrapper">
                                <img id="modal-img" src="" alt="Project Preview">
                            </div>
                        </div>
                    </div>

                    <div class="next-project-wrapper">
                        <span id="next-project-btn">Next project ➔</span>
                    </div>
                </div>
            </div>
        </section>
    `;
};