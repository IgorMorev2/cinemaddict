import AbstractView from '../framework/view/abstract-view';

export default class FilmListContainerView extends AbstractView {
  #createFilmListContainerViewTemplate = () => '<div class="films-list__container"></div>';

  get template() {
    return this.#createFilmListContainerViewTemplate();
  }
}
