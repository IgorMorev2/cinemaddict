import AbstractView from '../framework/view/abstract-view';

export default class FilmsView extends AbstractView {
  #createFilmsTemplate = () => '<section class="films"></section>';

  get template() {
    return this.#createFilmsTemplate();
  }
}
