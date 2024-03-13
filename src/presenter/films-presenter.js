import { render, remove, replace } from '../framework/render';
import { FILMS_COUNT_PER_STER, TITLE_TEXT, SORT_TYPES } from '../consts';
import { updateItem } from '../utils/common';
import { sortFilmDate, sortFilmRating } from '../utils/sort';

import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import TitleFilmListView from '../view/title-film-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';

import FilmPresenter from './film-presenter';
import FilmDetailsPresenter from './film-details-presenter';


export default class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmsList = [];
  #selectedFilm = null;

  #currentSortType = SORT_TYPES.default;
  #sourcedBoardFilms = [];

  #renderedFilmCount = FILMS_COUNT_PER_STER;
  #filmPresenter = new Map();
  #filmDetailsPresenter = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortComponent = null;
  #titleFilmListComponent = null;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#filmsList = [...this.#filmsModel.films];
    this.#sourcedBoardFilms = [...this.#filmsModel.films];

    this.#renderBoard(this.#filmsListComponent.element);

    render(this.#filmsComponent, this.#container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
  };

  destroy = () => {
    remove(this.#filmsComponent);
    remove(this.#sortComponent);
  };

  #handlerShowMoreClick = () => {
    this.#filmsList
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STER)
      .forEach((film) => this.#renderFilm(this.#filmsListContainerComponent.element, film));

    this.#renderedFilmCount += FILMS_COUNT_PER_STER;

    if (this.#renderedFilmCount >= this.#filmsList.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderBoard(this.#filmsListComponent.element);
  };

  #handlerChangeFilm = (updatedFilm) => {
    this.#filmsList = updateItem(this.#filmsList, updatedFilm);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);

    if (this.#filmDetailsPresenter && this.#selectedFilm.id === updatedFilm.id) {
      this.#selectedFilm = updatedFilm;
      this.#renderFilmDetails();
    }
  };

  #handlerEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#handlerEscKeyDown);
    }
  };

  #addFilmDetailsComponent = (film) => {
    this.#selectedFilm = film;
    this.#renderFilmDetails(document.body);
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;
    this.#selectedFilm = null;

    document.body.classList.remove('hide-overflow');
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SORT_TYPES.date:
        this.#filmsList.sort(sortFilmDate);
        break;
      case SORT_TYPES.rating:
        this.#filmsList.sort(sortFilmRating);
        break;
      default:
        this.#filmsList = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILMS_COUNT_PER_STER;
    remove(this.#showMoreButtonComponent);
  };

  #renderSort = (container) => {
    if (!this.#sortComponent) {
      this.#sortComponent = new SortView(this.#currentSortType);
      render(this.#sortComponent, container);
    } else {
      const updatedSortComponent = new SortView(this.#currentSortType);
      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }

    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  };

  #renderTitleFilmList = (container, titleText) => {
    this.#titleFilmListComponent = new TitleFilmListView(titleText);
    render(this.#titleFilmListComponent, container);
  };

  #renderShowMoreButton = (container) => {
    this.#showMoreButtonComponent.setClickHandler(this.#handlerShowMoreClick);
    render(this.#showMoreButtonComponent, container);
  };

  #renderFilm = (container, film) => {
    const filmPresenter = new FilmPresenter(container, this.#handlerChangeFilm, this.#addFilmDetailsComponent);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (container, from, to) => {
    this.#filmsList
      .slice(from, to)
      .forEach((film) => {
        this.#renderFilm(container, film);
      });
  };

  #renderFilmDetails = (container) => {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];

    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        container,
        this.#handlerChangeFilm,
        this.#removeFilmDetailsComponent,
        this.#handlerEscKeyDown
      );
    }

    this.#filmDetailsPresenter.init(this.#selectedFilm, comments);
  };

  #renderBoard = (container) => {
    if (this.#filmsList.length === 0 || this.#renderedFilmCount === 0) {
      this.#renderTitleFilmList(container, TITLE_TEXT.emptyText.allMovies);
    } else {
      this.#renderSort(this.#container);
      this.#renderTitleFilmList(container, TITLE_TEXT.defaultText);
      render(this.#filmsListContainerComponent, container);
      this.#renderFilms(this.#filmsListContainerComponent.element, 0, Math.min(this.#filmsList.length, this.#renderedFilmCount));
      this.#renderShowMoreButton(this.#filmsListComponent.element);
    }
  };
}
