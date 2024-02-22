import AbstractView from '../framework/view/abstract-view';
import { EMPTY_TEXT } from '../consts';

export default class FilmsListEmptyTextView extends AbstractView {
  #makeFilmsListEmptyTextTemplate = () => `<h2 class="films-list__title">${EMPTY_TEXT}</h2>`;

  get template() {
    return this.#makeFilmsListEmptyTextTemplate();
  }
}
