import { render } from './render.js';
import ProfileView from './view/profile-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import StatisticsView from './view/statistics-view.js';

import FilmsPresenter from './presenter/films-presenter';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const footerStatisticsContainer = footer.querySelector('.footer__statistics');

render(new ProfileView(), header);
render(new MainNavigationView(), main);
render(new StatisticsView(), footerStatisticsContainer);

new FilmsPresenter().init(main);

