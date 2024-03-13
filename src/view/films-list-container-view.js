import AbstractView from '../framework/view/abstract-view';

const createFilmListContainerViewTemplate = () => '<div class="films-list__container"></div>';

export default class FilmListContainerView extends AbstractView {

  get template() {
    return createFilmListContainerViewTemplate();
  }
}
