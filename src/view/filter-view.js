import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  #createFilterTemplate = (filterItems) => {
    const filterItemsTemplate = filterItems
      .filter((filter) => filter.name !== 'All')
      .map((filter) => this.#createFilterItemTemplate(filter))
      .join('');

    return `
      <nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </nav>
    `;
  };

  #createFilterItemTemplate = (filter) => {
    const { name, count } = filter;

    return `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;
  };

  get template() {
    return this.#createFilterTemplate(this.#filters);
  }
}
