import { createElement } from '../render.js';

export default class FilmsView {
  #element;

  #createFilmsTemplate = () => '<section class="films"></section>';

  get template() {
    return this.#createFilmsTemplate();
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
