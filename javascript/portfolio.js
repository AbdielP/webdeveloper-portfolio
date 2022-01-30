(() => {
    const App = {
        variables: {
            projectIndex: 0,
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
                App.variables.projects = data.projects; 
                App.utils.notFound();
                App.events.displayHTML(project);
            }, params: () => {
                const urlParams = new URLSearchParams(window.location.search);
                App.variables.projectIndex = urlParams.get('project');
                App.initializeData.setIndex();
            }, setIndex: () => {
                App.variables.counter = Number(App.variables.projectIndex);
            }
        },
        events: {
            displayHTML: ({ desktop_img, mobile_img, title, description, live_site, github, built, info, logos }) => {
                App.htmlElements.containerImg.style.backgroundImage = `url(../assets/img/${desktop_img})`;
                App.htmlElements.imgPreview.setAttribute('src', `../assets/img/${mobile_img}`);
                App.htmlElements.linkGithub.setAttribute('href', github);

                App.htmlElements.paragraphInfo.textContent = description;
                App.htmlElements.title.textContent = title;
                App.htmlElements.info.textContent = info;
                
                App.events.displatLiveSite(live_site);
                App.events.techsDOM(logos);
                App.events.liDOM(built);
            },
            displatLiveSite: (livesite) => {
                if (livesite === "") {
                    App.htmlElements.linkLive.removeAttribute('href');
                    App.htmlElements.linkLive.removeAttribute('target');
                    App.htmlElements.linkLive.classList.remove('a__info', 'cursor-pointer');
                    App.htmlElements.linkLive.classList.add('a__info--nolivesite');
                    App.htmlElements.linkLive.textContent = "No live site available 🙇"
                } else {
                    App.htmlElements.linkLive.innerHTML = ''
                    const img = document.createElement('img');
                    img.classList.add('a__icon');
                    img.setAttribute('alt', 'Globe americas icon');
                    img.setAttribute('src', '../assets/icons/globe-americas-solid.svg');
                    App.htmlElements.linkLive.append(img);
                    App.htmlElements.linkLive.append('Live site');
                    App.htmlElements.linkLive.classList.remove('a__info--nolivesite');
                    App.htmlElements.linkLive.classList.add('a__info', 'cursor-pointer');
                    App.htmlElements.linkLive.setAttribute('target', '_blank');
                    App.htmlElements.linkLive.setAttribute('href', livesite);
                }
            },
            liDOM: (built) => {
                App.htmlElements.list.innerHTML = '';
                const domFragment = document.createDocumentFragment();
                built.forEach(element => {
                    let li = document.createElement('li');
                    li.append(element);
                    domFragment.appendChild(li);
                });
                App.htmlElements.list.append(domFragment);
            },
            techsDOM: (logos) => {
                App.htmlElements.containerTechs.innerHTML = '';
                const domFragment = document.createDocumentFragment();
                logos.forEach(logo => {
                    let img = document.createElement('img');
                    img.classList.add('img__techs');
                    img.setAttribute('alt', 'web technology');
                    img.setAttribute('src', `../assets/img/${logo}`)
                    domFragment.appendChild(img);
                });
                App.htmlElements.containerTechs.append(domFragment);
            }
        },
        utils: {
            nextProject: () => {
                if (App.variables.counter >= App.variables.projects.length -1) {
                    return;
                } else {  
                    App.variables.counter++;
                    App.utils.changeProject(App.variables.counter);
                }
            }, prevProject: () => {
                if (App.variables.counter === 0) {
                    return;
                } else {
                    App.variables.counter--;
                    App.utils.changeProject(App.variables.counter);
                }
            }, changeProject: (number) => {
                history.pushState({}, 'portfolio', `portfolio.html?project=${Number(number)}`);
                App.events.displayHTML(App.variables.projects[number]);
            }, notFound: () => {
                if (App.variables.projectIndex > App.variables.projects.length -1) {
                    window.location.href = "../index.html";
                }
            }
        }
    }
    App.init();
})();