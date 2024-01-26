import { createElement } from '../render';

const createFilmsListTemplate = () =>
  `
    <section class="films__list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  `;

export default class FilmsListView {
  getTemplate() {
    return createFilmsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(createFilmsListTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
