(() => {
    const App = {
        variables: {
            projectIndex: null,
            projects: [],
            counter: 0
        },
        htmlElements: {
            containerImg: document.querySelector('#container_image'),
        },
        init: () => {
            App.initializeData.params();
            App.initializeData.projects();
        },
        bindEvents: () => {},
        initializeData: {
            projects: async () => {
                const data = await Service.getProjects('../data.json');
                const project = data.projects[App.variables.projectIndex];
                App.events.displayHTML(project);
                App.variables.projects = data.projects;
            },
            params: () => {
                const urlParams = new URLSearchParams(window.location.search);
                App.variables.projectIndex = urlParams.get('project');
            }
        },
        events: {
            displayHTML: ({ desktop_img, mobile_img, title, description, live_site, github, built, info, logos }) => {
                App.htmlElements.containerImg.style.backgroundImage = `url(../assets/img/${desktop_img})`
            }
        },
        utils: {}
    }
    App.init();
})();