(() => {
    const App = {
        htmlElements: {},
        init: () => {
            App.initializeData.projects();
        },
        initializeData: {
            projects: async () => {
                const data = await App.utils.getProjects();
                const projects = data.projects;
                console.log(projects);
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