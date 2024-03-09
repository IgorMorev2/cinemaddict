import AbstractView from '../framework/view/abstract-view';
import { SORT_TYPES } from '../consts';

export default class SortView extends AbstractView {
  #currentSortType = null;

  #createSortTemplate = () =>
    `
      <ul class="sort">
        <li><a href="#" class="sort__button ${this.#currentSortType === SORT_TYPES.default ? 'sort__button--active' : ''}" data-sort-type = ${SORT_TYPES.default}>Sort by default</a></li>
        <li><a href="#" class="sort__button ${this.#currentSortType === SORT_TYPES.date ? 'sort__button--active' : ''}" data-sort-type = ${SORT_TYPES.date}>Sort by date</a></li>
        <li><a href="#" class="sort__button ${this.#currentSortType === SORT_TYPES.rating ? 'sort__button--active' : ''}" data-sort-type = ${SORT_TYPES.rating}>Sort by rating</a></li>
      </ul>
    `;

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      this._callback.sortTypeChange(evt.target.dataset.sortType);
    }
  };

  constructor (currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  };

  get template() {
    return this.#createSortTemplate();
  }
}
