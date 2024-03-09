import AbstractView from '../framework/view/abstract-view';

export default class StatisticsView extends AbstractView {
  #allMoviesCount = null;

  #createStatisticsTemplate = (allMoviesCount) => `<p>${allMoviesCount} movies inside</p>`;

  constructor(allMoviesCount) {
    super();
    this.#allMoviesCount = allMoviesCount;
  }

  get template() {
    return this.#createStatisticsTemplate(this.#allMoviesCount);
  }
}
