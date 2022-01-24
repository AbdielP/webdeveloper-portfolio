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
            btnPrev: document.querySelector('#btn_prev'),
            btnNext: document.querySelector('#btn_next'),
            title: document.querySelector('#title'),
            list: document.querySelector('#list'),
            info: document.querySelector('#info'),
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
                // App.htmlElements.containerImg.classList.add('animate__fadeInLeft');
                App.htmlElements.containerImg.style.backgroundImage = `url(../assets/img/${desktop_img})`;
                App.htmlElements.imgPreview.src = `../assets/img/${mobile_img}`;
                App.htmlElements.paragraphInfo.textContent = description;
                App.htmlElements.title.textContent = title;
                App.htmlElements.linkLive.href = live_site;
                App.htmlElements.linkGithub.href = github;
                App.htmlElements.info.textContent = info;
                App.htmlElements.list.innerHTML = '';
                built.forEach(element => {
                    App.htmlElements.list.innerHTML += `<li>${element}</li>`;
                });
                App.htmlElements.containerTechs.innerHTML = ''
                logos.forEach(logo => {
                    App.htmlElements.containerTechs.innerHTML += 
                    `<img class="img__techs" src="../assets/img/${logo}" alt="web tech logo">`
                });
                // App.htmlElements.containerImg.classList.remove('animate__fadeInLeft');
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