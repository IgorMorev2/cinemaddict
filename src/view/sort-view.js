import AbstractView from '../framework/view/abstract-view';

export default class SortView extends AbstractView {
  #createSortTemplate = () =>
    `
      <ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>
    `;

  get template() {
    return this.#createSortTemplate();
  }
}
