import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeDate, humanizeTime, getPeopleListTemplate, commentHumanizeDate } from '../utils/data';

const createFilmDetailsInfoTemplate = (film) => {
  const { filmInfo } = film;
  const { title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, release, runtime, genres, description } = filmInfo;
  const { date, releaseCountry } = release;

  const getGenresTemplate = () => {
    let genresTemplate = '';

    genres.forEach((genre) => {
      genresTemplate += `<span class="film-details__genre">${genre}</span>`;
    });

    return genresTemplate;
  };

  return `
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./${poster}" alt="">

        <p class="film-details__age">${ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${getPeopleListTemplate(writers)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${getPeopleListTemplate(actors)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${humanizeDate(date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${humanizeTime(runtime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">${getGenresTemplate()}</td>
          </tr>
        </table>

        <p class="film-details__film-description">${description}</p>
      </div>
    </div>
  `;
};

const createFilmDetailsControlsTemplate = (film) => {
  const { watchList, alreadyWatched, favorite } = film.userDetails;

  const activeControlClassName = 'film-details__control-button--active';

  const watchListClassName = watchList
    ? `film-details__control-button--watchlist ${activeControlClassName}`
    : 'film-details__control-button--watchlist';

  const watchedClassName = alreadyWatched
    ? `film-details__control-button--watched ${activeControlClassName}`
    : 'film-details__control-button--watched';

  const favoriteClassName = favorite
    ? `film-details__control-button--favorite ${activeControlClassName}`
    : 'film-details__control-button--favorite';

  return `
    <section class="film-details__controls">
      <button type="button" class="film-details__control-button ${watchListClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button ${watchedClassName}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
    </section >
    `;
};

const createFilmDetailsCommentsTemplate = (comments) => {
  const getCommentsTemplate = () => {
    let commentsTemplate = '';

    comments.forEach((comment) => {
      commentsTemplate += `
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.autor}</span>
              <span class="film-details__comment-day">${commentHumanizeDate(comment.date)}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
        `;
    });
    // 2019/12/31 23:59
    return commentsTemplate;
  };

  return `
    <ul class="film-details__comments-list">
      ${getCommentsTemplate()}
    </ul>
    `;
};

const createFilmDetailsFormTemplate = () =>
  `
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>
  `;

const createFilmDetailsTemplate = (film, comments) =>
  `
  <section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>

      ${createFilmDetailsInfoTemplate(film)}
      ${createFilmDetailsControlsTemplate(film)}

    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        ${createFilmDetailsCommentsTemplate(comments)}
        ${createFilmDetailsFormTemplate()}

      </section>
    </div>
  </form>
</section>
`;

export default class FilmDetailsView extends AbstractStatefulView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
  }

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.closeBtnClick();
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

  setCloseBtnClickHandler = (callback) => {
    this._callback.closeBtnClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

  setWatchlistBtnClickHandler = (callback) => {
    this._callback.watchlistBtnClick = callback;

    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchlistBtnClickHandler);
  };

  setWatchedBtnClickHandler = (callback) => {
    this._callback.watchedBtnClick = callback;

    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedBtnClickHandler);
  };

  setFavoriteBtnClickHandler = (callback) => {
    this._callback.favoriteBtnClick = callback;

    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteBtnClickHandler);
  };
}
