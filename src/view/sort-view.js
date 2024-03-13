import AbstractView from '../framework/view/abstract-view';
import { SORT_TYPES } from '../consts';

const createSortTemplate = (currentSortType) =>
  `
    <ul class="sort">
      <li><a href="#" class="sort__button ${currentSortType === SORT_TYPES.default ? 'sort__button--active' : ''}" data-sort-type = ${SORT_TYPES.default}>Sort by default</a></li>
      <li><a href="#" class="sort__button ${currentSortType === SORT_TYPES.date ? 'sort__button--active' : ''}" data-sort-type = ${SORT_TYPES.date}>Sort by date</a></li>
      <li><a href="#" class="sort__button ${currentSortType === SORT_TYPES.rating ? 'sort__button--active' : ''}" data-sort-type = ${SORT_TYPES.rating}>Sort by rating</a></li>
    </ul>
  `;

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

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
}
