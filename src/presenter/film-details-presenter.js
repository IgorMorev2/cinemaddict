import { render, remove, replace } from '../framework/render';

import FilmDetailsView from '../view/film-details-view';

export default class FilmDetailsPresenter {
  #film = null;
  #comments = null;
  #changeData = null;

  #filmDetailsContainer = null;
  #filmDetailsComponent = null;

  #handlerCloseBtnClick = null;
  #handlerEscKeyDown = null;

  constructor(filmDetailsContainer, changeData, handlerCloseBtnClick, handlerEscKeyDown) {
    this.#filmDetailsContainer = filmDetailsContainer;
    this.#changeData = changeData;
    this.#handlerCloseBtnClick = handlerCloseBtnClick;
    this.#handlerEscKeyDown = handlerEscKeyDown;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    this.#filmDetailsComponent.setCloseBtnClickHandler(this.#handlerCloseBtnClick);

    this.#filmDetailsComponent.setWatchlistBtnClickHandler(this.#handlerWatchlistBtnClick);
    this.#filmDetailsComponent.setWatchedBtnClickHandler(this.#handlerWatchedBtnClick);
    this.#filmDetailsComponent.setFavoriteBtnClickHandler(this.#handlerFavoriteBtnClick);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#filmDetailsContainer);
    } else {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }

    document.addEventListener('keydown', this.#handlerEscKeyDown);
    document.body.classList.add('hide-overflow');
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #handlerWatchlistBtnClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchList: !this.#film.userDetails.watchList,
      }
    });
  };

  #handlerWatchedBtnClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      }
    });
  };

  #handlerFavoriteBtnClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      }
    });
  };
}
