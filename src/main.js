import { render } from './framework/render';
import { generateFilter } from './fish/filter.js';

//Поключение классов из Model
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model.js';

//Поключение классов из View
import ProfileView from './view/profile-view';
import FilterView from './view/filter-view.js';
import StatisticsView from './view/statistics-view';

//Поключение классов из Presenter
import FilmsPresenter from './presenter/films-presenter';

//Контейнеры для рендеринга
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const footerStatisticsContainer = footer.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

const filters = generateFilter(filmsModel.films);
const alreadyWatchindCount = filters
  .find((filter) => filter.name === 'Watchlist')
  .count;

const allMoviesCount = filters
  .find((filter) => filter.name === 'All')
  .count;

//Рендеринг
render(new ProfileView(alreadyWatchindCount), header);
render(new FilterView(filters), main);
render(new StatisticsView(allMoviesCount), footerStatisticsContainer);

const filmsPresenter = new FilmsPresenter(main, filmsModel, commentsModel);

//Инициализация Презентера
filmsPresenter.init();
