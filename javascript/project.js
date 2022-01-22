(() => {
    const App = {
        variables: {
            projectIndex: null,
            projects: [],
            counter: 0
        },
        htmlElements: {
            imgPreviewDesktop: document.getElementById('img_preview_desktop'),
            containerTechs: document.getElementById('container_techs'),
            paragraphInfo: document.getElementById('paragraph_info'),
            linkGithub: document.getElementById('link_github'),
            imgPreview: document.getElementById('img_preview'),
            linkLive: document.getElementById('link_live'),
            btnPrev: document.getElementById('btn_prev'),
            btnNext: document.getElementById('btn_next'),
            title: document.getElementById('title'),
            list: document.getElementById('list'),
            info: document.getElementById('info'),
            img: document.getElementById('img')
        },
        init: () => {
            App.bindEvents();
            App.initializeData.params();
            App.initializeData.projects();
        },
        bindEvents: () => {
            App.htmlElements.btnNext.addEventListener('click', () => {
                App.utils.nextProject();
            });
            App.htmlElements.btnPrev.addEventListener('click', () => {
                App.utils.prevProject();
            });
        },
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
                App.htmlElements.img.src = `../assets/img/${desktop_img}`;
                App.htmlElements.paragraphInfo.textContent = description;
                App.htmlElements.imgPreviewDesktop.src = `../assets/img/${desktop_img}`;
                App.htmlElements.title.textContent = title;
                App.htmlElements.linkLive.href = live_site;
                App.htmlElements.linkGithub.href = github;
                App.htmlElements.list.innerHTML = '';
                built.forEach(element => {
                    App.htmlElements.list.innerHTML += `<li>${element}</li>`;
                });
                App.htmlElements.info.textContent = info;
                App.htmlElements.imgPreview.src = `../assets/img/${mobile_img}`;
                App.htmlElements.containerTechs.innerHTML = ''
                logos.forEach(logo => {
                    App.htmlElements.containerTechs.innerHTML += 
                    `<img class="img__techs" src="../assets/img/${logo}" alt="web tech logo">`
                    // `<img class="img__techs" src="../assets/img/${logo}" alt="web tech logo">` FALTA ESTA PARA DESKTOPS...  Y CORREGIR LA IMG de Huddle (es gigante)
                })
            }
        },
        utils: {
            nextProject: () => {
                if (App.variables.counter < App.variables.projects.length-1) {
                    App.variables.counter = App.variables.counter + 1;
                    App.utils.changeProject(App.variables.counter);
                }
            },
            prevProject: () => {
                if (App.variables.counter > 0) {
                    App.variables.counter = App.variables.counter - 1;
                    App.utils.changeProject(App.variables.counter);
                }
            },
            changeProject: (number) => {
                history.pushState({}, 'mywork', `mywork.html?project=${Number(number)}`);
                App.events.displayHTML(App.variables.projects[number]);
            }
        }
    }
    App.init();
})();