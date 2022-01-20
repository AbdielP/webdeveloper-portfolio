(() => {
    const App = {
        htmlElements: {
            myworkContainer: document.getElementById('mywork_container')
        },
        init: () => {
            App.initializeData.projects();
        },
        initializeData: {
            projects: async () => {
                const data = await App.utils.getProjects();
                const projects = data.projects;
                App.events.showProjects(projects);
            }
        },
        events: {
            showProjects: (projects) => {
                projects.forEach((project, index, arr) => {
                    App.htmlElements.myworkContainer.innerHTML +=
                    `<div class="card cursor-pointer">
                        <a href="pages/mywork.html?project=${index}">
                            <img class="card__img" src="assets/img/${project.desktop_img}" alt="room homepage website">
                        </a>
                    </div>`;
                });
            }
        },
        utils: {
            getProjects: async () => {
                try {
                    const response = await fetch('./data.json');
                    return response.json();
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            }
        }
    }
    App.init();
})();