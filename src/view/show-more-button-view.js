import AbstractView from '../framework/view/abstract-view';

export default class ShowMoreButtonView extends AbstractView {
  #createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  };

  get template() {
    return this.#createShowMoreButtonTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };
}
