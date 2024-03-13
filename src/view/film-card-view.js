import AbstractView from '../framework/view/abstract-view';
import { humanizeTime, getYearFromDate } from '../utils/data';

const createFilmCardInfoTemplate = (film) => {
  const { comments, filmInfo } = film;
  const { title, totalRating, poster, description, runtime, genres, release } = filmInfo;
  const { date } = release;

  const visibleDescription = description.length > 140
    ? `${description.slice(0, 139)}...`
    : description;

  const duration = humanizeTime(runtime);

  return `
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getYearFromDate(date)}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${visibleDescription}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
  `;
};

const createFilmCardControlsTemplate = (film) => {
  const { watchList, alreadyWatched, favorite } = film.userDetails;

  const activeControlClassName = 'film-card__controls-item--active';

  const watchListClassName = watchList
    ? `film-card__controls-item--add-to-watchlist ${activeControlClassName}`
    : 'film-card__controls-item--add-to-watchlist';

  const watchedClassName = alreadyWatched
    ? `film-card__controls-item--mark-as-watched ${activeControlClassName}`
    : 'film-card__controls-item--mark-as-watched';

  const favoriteClassName = favorite
    ? `film-card__controls-item--favorite ${activeControlClassName}`
    : 'film-card__controls-item--favorite';

  return `
  <div class="film-card__controls">
    <button class="film-card__controls-item ${watchListClassName}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${watchedClassName}" type="button">Mark as watched</button>
    <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
  </div>
`;
};

const createFilmCardTemplate = (film) =>
  `
  <article class="film-card">
    ${createFilmCardInfoTemplate(film)}
    ${createFilmCardControlsTemplate(film)}
  </article>
`;

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #linkClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.linkClick(this.#film);
  };

  #watchlistBtnClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.watchlistBtnClick();
  };

  #watchedBtnClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.watchedBtnClick();
  };

  #favoriteBtnClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.favoriteBtnClick();
  };

  setLinkClickHandler = (callback) => {
    this._callback.linkClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#linkClickHandler);
  };

  setWatchlistBtnClickHandler = (callback) => {
    this._callback.watchlistBtnClick = callback;

    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#watchlistBtnClickHandler);
  };

  setWatchedBtnClickHandler = (callback) => {
    this._callback.watchedBtnClick = callback;

    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#watchedBtnClickHandler);
  };

  setFavoriteBtnClickHandler = (callback) => {
    this._callback.favoriteBtnClick = callback;

    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteBtnClickHandler);
  };
}
