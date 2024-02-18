import { createElement } from '../render';

export default class ShowMoreButtonView {
  #element;

  #createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

  get template() {
    return this.#createShowMoreButtonTemplate();
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
