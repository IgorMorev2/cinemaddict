import AbstractView from '../framework/view/abstract-view';

export default class FilmsListView extends AbstractView {
  #createFilmsListTemplate = () =>
    `
      <section class="films__list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    `;

  get template() {
    return this.#createFilmsListTemplate();
  }
}
