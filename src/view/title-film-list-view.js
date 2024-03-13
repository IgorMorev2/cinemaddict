import AbstractView from '../framework/view/abstract-view';
import { TITLE_TEXT } from '../consts';


const createTitleFilmListTemplate = (titleText) => {
  const classTitleFilmList = titleText === TITLE_TEXT.defaultText ?
    'films-list__title visually-hidden' :
    'films-list__title';

  return `<h2 class="${classTitleFilmList}">${titleText}</h2>`;
};

export default class TitleFilmListView extends AbstractView {
  #titleText = null;

  constructor(titleText = 'All movies. Upcoming') {
    super();
    this.#titleText = titleText;
  }

  get template() {
    return createTitleFilmListTemplate(this.#titleText);
  }
}
