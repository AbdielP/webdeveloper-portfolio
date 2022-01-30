(() => {
    const App = {
        htmlElements: {
            myworkContainer: document.getElementById('mywork_container')
        },
        init: () => {
            App.initializeData.projects();
        },
        initializeData: {
            projects: async () => {
                const data = await Service.getProjects('./data.json')
                const projects = data.projects;
                App.events.cardsDOM(projects);
            }
        },
        events: {
            cardsDOM: (projects) => {
                let divFragment = document.createDocumentFragment();
                projects.forEach((project, index, arr) => {
                    let a = document.createElement('a');
                    let div = document.createElement('div');
                    let img = document.createElement('img');

                    img.classList.add('card__img');
                    div.classList.add('card', 'cursor-pointer');

                    a.setAttribute('aria-label', 'project cards');
                    a.setAttribute('href', `pages/portfolio.html?project=${index}`);
                    img.setAttribute('src', `assets/img/${project.desktop_img}`);
                    img.setAttribute('alt', project.title);
                    div.appendChild(a);
                    a.appendChild(img);
                    divFragment.appendChild(div);
                })
                App.htmlElements.myworkContainer.append(divFragment);
            }
        }
    }
    App.init();
})();