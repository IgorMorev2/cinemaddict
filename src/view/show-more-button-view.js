import AbstractView from '../framework/view/abstract-view';

export default class ShowMoreButtonView extends AbstractView {
  #createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

  get template() {
    return this.#createShowMoreButtonTemplate();
  }
}
