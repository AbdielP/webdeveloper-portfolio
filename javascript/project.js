(() => {
    const App = {
        variables: {
            projectIndex: null
        },
        htmlElements: {
            imgPreviewDesktop: document.getElementById('img_preview_desktop'),
            containerTechs: document.getElementById('container_techs'),
            paragraphInfo: document.getElementById('paragraph_info'),
            linkGithub: document.getElementById('link_github'),
            imgPreview: document.getElementById('img_preview'),
            linkLive: document.getElementById('link_live'),
            title: document.getElementById('title'),
            list: document.getElementById('list'),
            info: document.getElementById('info'),
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
                App.htmlElements.imgPreviewDesktop.src = `../assets/img/${desktop_img}`;
                App.htmlElements.title.textContent = title;
                App.htmlElements.linkLive.href = live_site;
                App.htmlElements.linkGithub.href = github;
                built.forEach(element => {
                    App.htmlElements.list.innerHTML += `<li>${element}</li>`;
                });
                App.htmlElements.info.textContent = info;
                App.htmlElements.imgPreview.src = `../assets/img/${mobile_img}`;
                logos.forEach(logo => {
                    App.htmlElements.containerTechs.innerHTML += `<img class="img__techs" src="../assets/img/${logo}" alt="web tech logo">`
                })
            }
        }
    }
    App.init();
})();