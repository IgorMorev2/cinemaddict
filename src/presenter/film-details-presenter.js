import { render, remove } from '../framework/render';

import FilmDetailsView from '../view/film-details-view';

export default class FilmDetailsPresenter {
  #film = null;
  #comments = null;

  #filmDetailsContainer = null;
  #filmDetailsComponent = null;

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.destroy();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  constructor(filmDetailsContainer) {
    this.#filmDetailsContainer = filmDetailsContainer;
  }

  destroy = () => {
    remove(this.#filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
  };

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    render(this.#filmDetailsComponent, this.#filmDetailsContainer);

    this.#filmDetailsComponent.setCloseButtonClickHandler(this.destroy);
    document.addEventListener('keydown', this.#onEscKeyDown);
    document.body.classList.add('hide-overflow');
  };
}
