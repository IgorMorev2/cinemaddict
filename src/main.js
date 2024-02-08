import { render } from './render';

//Поключение классов из View
import ProfileView from './view/profile-view';
import MainNavigationView from './view/main-navigation-view';
import StatisticsView from './view/statistics-view';

//Поключение классов из Presenter
import FilmsPresenter from './presenter/films-presenter';

//Поключение классов из Model
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model.js';

//Контейнеры для рендеринга
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const footerStatisticsContainer = footer.querySelector('.footer__statistics');

//Рендеринг
render(new ProfileView(), header);
render(new MainNavigationView(), main);
render(new StatisticsView(), footerStatisticsContainer);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

//Инициализация Презентера
new FilmsPresenter().init(main, filmsModel, commentsModel);

// import { generateFilms } from './fish/film.js';
// import { generateComments } from './fish/comment.js';

// const films = generateFilms();
// const comments = generateComments(films);

// console.log(films);
// console.log(comments);

