import { render, remove } from '../framework/render';
import { FILMS_COUNT_PER_STER, TITLE_TEXT } from '../consts';
import { updateItem } from '../utils/common';

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
  #filmsList = null;
  #selectedFilm = null;

  #renderedFilmCount = FILMS_COUNT_PER_STER;
  #filmPresenter = new Map();
  #filmDetailsPresenter = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortComponent = new SortView();
  #titleFilmListComponent = null;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#filmsList = [...this.#filmsModel.films];

    this.#renderBoard();
  };

  #handlerShowMoreClick = () => {
    this.#filmsList
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STER)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILMS_COUNT_PER_STER;

    if (this.#renderedFilmCount >= this.#filmsList.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #addFilmDetailsComponent = (film) => {
    this.#selectedFilm = film;
    this.#renderFilmDetails();
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;
    this.#selectedFilm = null;

    document.body.classList.remove('hide-overflow');
  };


  #handlerChangeFilm = (updatedFilm) => {
    this.#filmsList = updateItem(this.#filmsList, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);

    if (this.#filmDetailsPresenter && this.#selectedFilm.id === updatedFilm.id) {
      this.#selectedFilm = updatedFilm;
      this.#renderFilmDetails();
    }
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILMS_COUNT_PER_STER;
    remove(this.#showMoreButtonComponent);
  };


  #renderSort = () => {
    render(this.#sortComponent, this.#container);
  };

  #renderTitleFilmList = (titleText) => {
    this.#titleFilmListComponent = new TitleFilmListView(titleText);
    render(this.#titleFilmListComponent, this.#filmsListComponent.element);
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent.setClickHandler(this.#handlerShowMoreClick);
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#handlerChangeFilm, this.#addFilmDetailsComponent);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#filmsList
      .slice(from, to)
      .forEach((film) => {
        this.#renderFilm(film);
      });
  };

  #renderFilmDetails = () => {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];

    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        document.body,
        this.#handlerChangeFilm,
        this.#removeFilmDetailsComponent,
        this.#onEscKeyDown
      );
    }

    this.#filmDetailsPresenter.init(this.#selectedFilm, comments);
  };

  #renderBoard = () => {
    if (this.#filmsList.length === 0 || this.#renderedFilmCount === 0) {
      this.#renderTitleFilmList(TITLE_TEXT.emptyText.allMovies);
    } else {
      this.#renderSort();
      this.#renderTitleFilmList(TITLE_TEXT.defaultText);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
      this.#renderFilms(0, Math.min(this.#filmsList.length, this.#renderedFilmCount));
      this.#renderShowMoreButton();
    }

    render(this.#filmsComponent, this.#container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
  };
}
