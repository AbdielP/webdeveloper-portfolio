<p align="center">
<a href="https://www.linkedin.com/in/abdiel-pinz%C3%B3n-343812196/" target="_blank"><img alt="LinkedIn" src="https://img.shields.io/badge/Linkedin-%40abdiel--pinz%C3%B3n--343812196-%230961B8?style=flat&logo=linkedin"></a>
 <a href="mailto:abdiel.pinzonc@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-abdiel.pinzonc@gmail.com-blue?style=flat&logo=gmail"></a>
 <a href="https://twitter.com/Abdiel262" target="_blank"><img alt="Twitter" src="https://img.shields.io/twitter/url?label=Abdiel262&style=social&url=https%3A%2F%2Ftwitter.com%2FAbdiel262"></a>
</p>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://abdielp.github.io/webdeveloper-portfolio/" target="_blank">
    <img src="https://github.com/AbdielP/AbdielP/blob/master/images/sol.png" alt="Logo">
  </a>

  <h3 align="center">Web Developer Porfolio</h3>

  <p align="center">
    <br />
    <a href="https://abdielp.github.io/webdeveloper-portfolio/">Live site</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
## Table of contents

- [About The Project](#about-the-project)
- [Built with](#built-with)
- [Usage](#usage)
- [Licence](#license)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project

![Screenshot](https://github.com/AbdielP/webdeveloper-portfolio/blob/master/assets/img/portfolio.png)

My developer portfolio. It's a fully responsive web page that compiles most of my work.
It has a logic layer built with modular design pattern in Javascript.

### Built With

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [animate.css](https://animate.style/)
- Javascript

Code logic was written using Javascript with a modular pattern design.

```js
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
                App.events.showProjects(projects);
            }
        },
        events: {
            showProjects: (projects) => {
                projects.forEach((project, index, arr) => {
                    if( index <= 8) {
                        App.htmlElements.myworkContainer.innerHTML +=
                        `<div class="card cursor-pointer">
                            <a href="pages/portfolio.html?project=${index}">
                                <img class="card__img" src="assets/img/${project.desktop_img}" alt="room homepage website">
                            </a>
                        </div>`;
                    }
                });
            }
        }
    }
    App.init();
})();
```

<p align="right"><a href="#top">(back to top)</a></p>

<!-- USAGE EXAMPLES -->
## Usage

Click on project cards at index.html to get info about my work.

<img src="https://github.com/AbdielP/webdeveloper-portfolio/blob/master/assets/img/cards.png" alt="Cards" width="550px"/>

Then, on portfolio.html use the navigation buttons to move between projects.

<img src="https://github.com/AbdielP/webdeveloper-portfolio/blob/master/assets/img/nav_buttons.png" alt="Cards" width="550px"/>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Twitter - [@Abdiel262](https://twitter.com/Abdiel262)

Linkedin - [@Abdiel Pinzón](https://www.linkedin.com/in/abdiel-pinz%C3%B3n-343812196/)

Project Link: [Github Repo](https://github.com/AbdielP/webdeveloper-portfolio)

<p align="right">(<a href="#top">back to top</a>)</p>
