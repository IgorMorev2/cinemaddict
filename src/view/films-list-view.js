import AbstractView from '../framework/view/abstract-view';

export default class FilmsListView extends AbstractView {
  #createFilmsListTemplate = () => '<section class="films__list"></section>';

  get template() {
    return this.#createFilmsListTemplate();
  }
}
