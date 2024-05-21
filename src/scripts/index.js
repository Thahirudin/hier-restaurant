import 'regenerator-runtime';
import '../styles/css/main.css';
import './components/nav-bar';
import './components/hero-jumbotron';
import './components/resto-list';
import './components/modal-section';
import './components/footer-bar';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('.nav-menu'),
  content: document.querySelector('#mainContent'),
});
const skipLink = document.querySelector('.skipToContent');
const mainContent = document.querySelector('#mainContent');

skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  mainContent.focus();
});
window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

// import 'regenerator-runtime';
// import '../styles/main.css';
// import './components/nav-bar.js';
// import './components/hero-jumbotron.js';
// import './components/resto-list.js';
// import './components/modal-section.js';
// import './components/footer-bar.js';
// import '../styles/sass/style.scss';

// const hamburgerButtonElement = document.querySelector('#hamburger');
// const drawerElement = document.querySelector('.nav-menu');

// hamburgerButtonElement.addEventListener('click', (event) => {
//   drawerElement.classList.toggle('open');
//   event.stopPropagation();
// });

// const card = document.querySelectorAll('.card');

// card.forEach((target) => {
//   target.addEventListener('click', () => {
//     const pictureId = target.querySelector('img').src;
//     const city = target.querySelector('.card-city').textContent;
//     const rating = target.querySelector('.card-rating p').textContent;
//     const name = target.querySelector('.card-title h3').textContent;
//     const description = target.querySelector('.card-description p').textContent;

//     const modal = document.createElement('modal-section');

//     modal.dataSet = {
//       pictureId, city, rating, name, description,
//     };
//     document.querySelector('body').appendChild(modal);
//   });
// });
