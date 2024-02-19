import { render } from '../render';

import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmDetailsView from '../view/film-details-view';


export default class FilmsPresenter {
  #container;
  #filmsModel;
  #commentsModel;
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmCardComponent;
  #filmDetailsComponent;

  #renderFilm = (film) => {
    this.#filmCardComponent = new FilmCardView(film);
    const linkFilmCard = this.#filmCardComponent.element.querySelector('.film-card__link');

    linkFilmCard.addEventListener('click', () => {
      this.#addFilmDetails(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    render(this.#filmCardComponent, this.#filmsListContainerComponent.element);
  };

  #addFilmDetails = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetails = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.#removeFilmDetails();
    }
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.comments = film;
    const comments = [...this.#commentsModel.comments];

    this.#filmDetailsComponent = new FilmDetailsView(film, comments);
    const closeButtonFilmDetails = this.#filmDetailsComponent.element.querySelector('.film-details__close-btn');

    closeButtonFilmDetails.addEventListener('click', this.#removeFilmDetails);

    render(this.#filmDetailsComponent, this.#container.parentElement);
  };

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.filmsList = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
  }

  init = () => {
    render(new SortView(), this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.filmsList.forEach((film) => {
      this.#renderFilm(film);
    });

    render(new ShowMoreButtonView(), this.#filmsListComponent.element);
  };
}
