(() => {
    const App = {
        variables: {
            projectIndex: null
        },
        init: () => {
            App.initializeData.params();
            App.initializeData.projects();
        },
        initializeData: {
            
            projects: async () => {
                const data = await Service.getProjects('../data.json');
                const projects = data.projects;
                App.events.displayHTML(projects);
            },
            params: () => {
                const urlParams = new URLSearchParams(window.location.search);
                App.variables.projectIndex = urlParams.get('project');
            }
        },
        events: {
            displayHTML: (projects) => {
                console.log(projects[App.variables.projectIndex]);
            }
        }
    }
    App.init();
})();