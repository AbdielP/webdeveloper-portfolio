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
                const data = await Service.getProjects('./data.json')
                const projects = data.projects;
                App.events.showProjects(projects);
            }
        },
        events: {
            showProjects: (projects) => {
                projects.forEach((project, index, arr) => {
                    App.htmlElements.myworkContainer.innerHTML +=
                    `<div class="card cursor-pointer shadows">
                        <a href="pages/mywork.html?project=${index}">
                            <img class="card__img" src="assets/img/${project.desktop_img}" alt="room homepage website">
                        </a>
                    </div>`;
                });
            }
        }
    }
    App.init();
})();