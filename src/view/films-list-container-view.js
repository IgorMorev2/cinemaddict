import { createElement } from '../render';

export default class FilmListContainerView {
  #element;

  #createFilmListContainerViewTemplate = () => '<div class="films-list__container"></div>';

  get template() {
    return this.#createFilmListContainerViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement = () => {
    this.#element = null;
  };
}
