import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeDate, humanizeTime, getPeopleListTemplate, commentHumanizeDate } from '../utils/data';
import { COMMENT_EMOTIONS } from '../consts';

const createFilmDetailsInfoTemplate = ({
  title, alternativeTitle, totalRating,
  poster, ageRating, director, writers,
  actors, release, runtime, genres, description }) => {

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

const createFilmDetailsControlsTemplate = ({ watchList, alreadyWatched, favorite }) => {

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

    return commentsTemplate;
  };

  return `
    <ul class="film-details__comments-list">
      ${getCommentsTemplate()}
    </ul>
    `;
};

const createFilmDetailsFormTemplate = (selectedEmoji, newComment) => {
  const createEmotionItemTemplate = () => {
    let emotionItemTemplate = '';

    COMMENT_EMOTIONS.forEach((emotion) => {
      const isChecked = emotion === selectedEmoji ? 'checked' : '';

      emotionItemTemplate += `
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${isChecked}>
      <label class="film-details__emoji-label" for="emoji-${emotion}" data-emotion-type = '${emotion}'>
        <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
      </label>
      `;
    });

    return emotionItemTemplate;
  };
  return `
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
        ${(selectedEmoji) ? `<img src="images/emoji/${selectedEmoji}.png" width="55" height="55" alt="emoji-${selectedEmoji}">` : ''}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${(newComment) ? newComment : ''}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${createEmotionItemTemplate()}
      </div>
    </div>
  `;
};

const createFilmDetailsTemplate = ({ filmInfo, userDetails, comments, selectedEmoji, newComment }) =>
  `
  <section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>

      ${createFilmDetailsInfoTemplate(filmInfo)}
      ${createFilmDetailsControlsTemplate(userDetails)}

    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        ${createFilmDetailsCommentsTemplate(comments)}
        ${createFilmDetailsFormTemplate(selectedEmoji, newComment)}

      </section>
    </div>
  </form>
</section>
`;

export default class FilmDetailsView extends AbstractStatefulView {

  constructor(film, comments, viewData, updateViewData) {
    super();
    this._state = FilmDetailsView.convertFilmToState(
      film,
      comments,
      viewData.emotion,
      viewData.comment,
      viewData.scrollPosition);

    this.updateViewData = updateViewData;
    this.#setInnetHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  static convertFilmToState = (film, comments, selectedEmoji = null, newComment = null, scrollPosition = 0) => ({
    ...film,
    comments,
    selectedEmoji,
    newComment,
    scrollPosition,
  });

  static convertStateToFilm = (state) => {
    const film = { ...state };

    film.comments = film.comments.map((comment) => {
      comment = comment.id;

      return comment;
    });

    delete film.selectedEmoji;
    delete film.newComment;
    delete film.scrollPosition;
  };

  _restoreHandlers = () => {
    this.#setInnetHandlers();
    this.setScrollPosition();
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setFavoriteBtnClickHandler(this._callback.favoriteBtnClick);
    this.setWatchedBtnClickHandler(this._callback.watchedBtnClick);
    this.setWatchlistBtnClickHandler(this._callback.watchlistBtnClick);
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
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

  #updateViewData = () => {
    this.updateViewData({
      emotion: this._state.checkedEmotion,
      comment: this._state.comment,
      scrollPosition: this.element.scrollTop
    });
  };

  #setInnetHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiSelectionHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputChangeHandler);
  };

  #emojiSelectionHandler = (evt) => {
    evt.preventDefault();
    const targetElement = evt.target.closest('label');

    if (!targetElement) {
      return;
    }

    this.updateElement({
      selectedEmoji: targetElement.dataset.emotionType,
      scrollPosition: this.element.scrollTop,
    });
  };

  #commentInputChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({ newComment: evt.target.value });
  };

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    FilmDetailsView.convertStateToFilm(this._state);
    this._callback.closeBtnClick();
  };

  #watchlistBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.watchlistBtnClick();
  };

  #watchedBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.watchedBtnClick();
  };

  #favoriteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.favoriteBtnClick();
  };
}
