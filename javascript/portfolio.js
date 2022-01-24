(() => {
    const App = {
        variables: {
            projectIndex: null,
            projects: [],
            counter: 0
        },
        htmlElements: {
            containerImg: document.querySelector('#container_image'),
            paragraphInfo: document.querySelector('#paragraph_info'),
            linkGithub: document.querySelector('#link_github'),
            linkLive: document.querySelector('#link_live'),
            title: document.querySelector('#title'),
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
                App.htmlElements.paragraphInfo.textContent = description;
                App.htmlElements.title.textContent = title;
                App.htmlElements.linkLive.href = live_site;
                App.htmlElements.linkGithub.href = github;
            }
        },
        utils: {}
    }
    App.init();
})();