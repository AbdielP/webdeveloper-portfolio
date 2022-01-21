(() => {
    const App = {
        variables: {
            projectIndex: null
        },
        htmlElements: {
            paragraphInfo: document.getElementById('paragraph_info'),
            linkGithub: document.getElementById('link_github'),
            linkLive: document.getElementById('link_live'),
            title: document.getElementById('title'),
            img: document.getElementById('img')
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
                App.htmlElements.img.src = `../assets/img/${desktop_img}`;
                App.htmlElements.paragraphInfo.textContent = description;
                App.htmlElements.title.textContent = title;
                App.htmlElements.linkLive.href = live_site;
                App.htmlElements.linkGithub.href = github;
            }
        }
    }
    App.init();
})();