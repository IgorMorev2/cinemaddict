import { createElement } from '../render';

export default class FilmsListView {
  #element;

  #createFilmsListTemplate = () =>
    `
      <section class="films__list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    `;

  get template() {
    return this.#createFilmsListTemplate();
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
