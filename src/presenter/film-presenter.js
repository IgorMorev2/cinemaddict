import { render, remove, replace } from '../framework/render';

import FilmCardView from '../view/film-card-view';
// import FilmDetailsPresenter from './film-details-presenter';

export default class FilmPresenter {
  #film = null;
  #filmContainer = null;
  #filmCardComponent = null;
  #changeData = null;

  constructor(filmContainer, changeData) {
    this.#filmContainer = filmContainer;
    this.#changeData = changeData;
  }


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

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setWatchlistBtnClickHandler(this.#handlerWatchlistBtnClick);
    this.#filmCardComponent.setWatchedBtnClickHandler(this.#handlerWatchedBtnClick);
    this.#filmCardComponent.setFavoriteBtnClickHandler(this.#handlerFavoriteBtnClick);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmContainer);
    } else {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }
  };
}