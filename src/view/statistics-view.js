import { createElement } from '../render';

export default class StatisticsView {
  #element;

  #createStatisticsTemplate = () => '<p>130 291 movies inside</p>';

  get template() {
    return this.#createStatisticsTemplate();
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
