import AbstractView from '../framework/view/abstract-view';

const createFilmsListTemplate = () => '<section class="films__list"></section>';

export default class FilmsListView extends AbstractView {

  get template() {
    return createFilmsListTemplate();
  }
}
