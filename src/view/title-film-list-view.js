import AbstractView from '../framework/view/abstract-view';
import { TITLE_TEXT } from '../consts';

export default class TitleFilmListView extends AbstractView {
  #titleText = null;

  #makeTitleFilmListTemplate = () => {
    const classTitleFilmList = this.#titleText === TITLE_TEXT.defaultText ?
      'films-list__title visually-hidden' :
      'films-list__title';

    return `<h2 class="${classTitleFilmList}">${this.#titleText}</h2>`;
  };

  constructor(titleText = 'All movies. Upcoming') {
    super();
    this.#titleText = titleText;
  }

  get template() {
    return this.#makeTitleFilmListTemplate();
  }
}
