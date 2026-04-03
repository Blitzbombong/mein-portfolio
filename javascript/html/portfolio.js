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
                    <span class="close-modal" id="close-modal-btn">&times;</span>
                    
                    <div class="modal-flex-container">
                        <div class="modal-left">
                            <span id="modal-number" class="project-number">01</span>
                            <h2 id="modal-title" class="modal-project-title">Join</h2>
                            
                            <h3 class="modal-question">What is this project about?</h3>
                            <p id="modal-description" class="modal-text"></p>
                            
                            <div id="modal-tech-icons" class="modal-tech-icons">
                                </div>
                            
                            <div class="modal-action-area">
                                <div class="modal-buttons-container">
                                    <a id="modal-github" href="#" target="_blank" class="custom-btn">
                                        GitHub <span class="arrow">
                                            <img src="icons/arrow-right.svg" alt="Arrow Icon">
                                        </span>
                                    </a>
                                    <a id="modal-live" href="#" target="_blank" class="custom-btn">
                                        Live Test <span class="arrow">
                                            <img src="icons/arrow-right.svg" alt="Arrow Icon">
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="modal-right">
                            <div class="modal-img-wrapper">
                                <img id="modal-img" src="" alt="Project Preview">
                            </div>
                        </div>
                    </div>

                    <div class="next-project-wrapper" id="next-project-btn">
                        <span>Next project</span>
                        <span class="arrow-right">
                            <img src="icons/arrow-right.svg" alt="Arrow Icon">
                        </span>
                    </div>
                </div>
            </div>
        </section>
    `;
};

export function renderTechIcons(icons) {
    const container = document.getElementById('modal-tech-icons');
    if (!container) return; // Sicherheitsscheck
    
    container.innerHTML = icons.map(tech => `
        <div class="tech-icon-item">
            <img src="./icons/${tech.toLowerCase()}.svg" alt="${tech}">
            <span>${tech}</span>
        </div>
    `).join(''); // .map() ist oft cleaner als .forEach + +=
}