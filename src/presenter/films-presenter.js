import { render, remove } from '../framework/render';
import { FILMS_COUNT_PER_STER } from '../consts';

import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListEmptyTextView from '../view/films-list-empty-text-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmDetailsView from '../view/film-details-view';


export default class FilmsPresenter {
  #container;
  #filmsModel;
  #commentsModel;
  #filmsList;
  #renderedFilmCount = FILMS_COUNT_PER_STER;
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmCardComponent;
  #filmDetailsComponent;
  #showMoreButtonComponent;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#filmsList = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
  }

  #renderFilm = (film) => {
    this.#filmCardComponent = new FilmCardView(film);

    this.#filmCardComponent.setLinkClickHandler(() => {
      this.#addFilmDetails(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    render(this.#filmCardComponent, this.#filmsListContainerComponent.element);
  };

  #addFilmDetails = (film) => {
    if (this.#filmDetailsComponent) {
      remove(this.#filmDetailsComponent);
    }

    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetails = () => {
    remove(this.#filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.#removeFilmDetails();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.comments = film;
    const comments = [...this.#commentsModel.comments];

    this.#filmDetailsComponent = new FilmDetailsView(film, comments);

    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#removeFilmDetails);

    render(this.#filmDetailsComponent, this.#container.parentElement);
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

  #renderFilmsSection = () => {
    if (this.#filmsListContainerComponent.element.children.length === 0) {
      render(new FilmsListEmptyTextView(), this.#container);
    } else {
      render(new SortView(), this.#container);
      render(this.#filmsComponent, this.#container);
      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
      this.#showMoreButtonComponent = new ShowMoreButtonView();

      this.#showMoreButtonComponent.setClickHandler(this.#handlerShowMoreClick);
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    }
  };

  init = () => {
    for (let i = 0; i < Math.min(this.#filmsList.length, this.#renderedFilmCount); i++) {
      this.#renderFilm(this.#filmsList[i]);
    }

    this.#renderFilmsSection();
  };
}
