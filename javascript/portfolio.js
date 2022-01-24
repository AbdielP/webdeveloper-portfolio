(() => {
    const App = {
        variables: {
            projectIndex: null,
            projects: [],
            counter: 0
        },
        htmlElements: {
            containerTechs: document.querySelector('#container_techs'),
            containerImg: document.querySelector('#container_image'),
            paragraphInfo: document.querySelector('#paragraph_info'),
            linkGithub: document.querySelector('#link_github'),
            imgPreview: document.querySelector('#img_preview'),
            linkLive: document.querySelector('#link_live'),
            title: document.querySelector('#title'),
            list: document.querySelector('#list'),
            info: document.querySelector('#info'),
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
                App.htmlElements.containerImg.style.backgroundImage = `url(../assets/img/${desktop_img})`;
                App.htmlElements.imgPreview.src = `../assets/img/${mobile_img}`;
                App.htmlElements.paragraphInfo.textContent = description;
                App.htmlElements.title.textContent = title;
                App.htmlElements.linkLive.href = live_site;
                App.htmlElements.linkGithub.href = github;
                App.htmlElements.info.textContent = info;
                built.forEach(element => {
                    App.htmlElements.list.innerHTML += `<li>${element}</li>`;
                });
                logos.forEach(logo => {
                    App.htmlElements.containerTechs.innerHTML += 
                    `<img class="img__techs" src="../assets/img/${logo}" alt="web tech logo">`
                })
            }
        },
        utils: {}
    }
    App.init();
})();