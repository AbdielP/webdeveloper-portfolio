(() => {
    const App = {
        variables: {
            projectIndex: null
        },
        htmlElements: {
            containerImg: document.getElementById('container_img')
        },
        init: () => {
            App.initializeData.params();
            App.initializeData.projects();
        },
        initializeData: {
            
            projects: async () => {
                const data = await Service.getProjects('../data.json');
                const project = data.projects[App.variables.projectIndex];
                App.events.displayHTML(project);
            },
            params: () => {
                const urlParams = new URLSearchParams(window.location.search);
                App.variables.projectIndex = urlParams.get('project');
            }
        },
        events: {
            displayHTML: ({desktop_img, mobile_img, title, description, live_site, github, built, info, logos}) => {
                App.htmlElements.containerImg.innerHTML += 
                `<img class="img" src="../assets/img/${desktop_img}" alt="Website example">`

            }
        }
    }
    App.init();
})();