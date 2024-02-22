import { createElement } from '../render';
import { EMPTY_TEXT } from '../consts';

export default class FilmsListEmptyTextView {
  #element;

  #makeFilmsListEmptyTextTemplate = () => `<h2 class="films-list__title">${EMPTY_TEXT}</h2>`;

  get template() {
    return this.#makeFilmsListEmptyTextTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
