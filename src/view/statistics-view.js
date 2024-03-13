import AbstractView from '../framework/view/abstract-view';

const createStatisticsTemplate = (allMoviesCount) => `<p>${allMoviesCount} movies inside</p>`;

export default class StatisticsView extends AbstractView {
  #allMoviesCount = null;

  constructor(allMoviesCount) {
    super();
    this.#allMoviesCount = allMoviesCount;
  }

  get template() {
    return createStatisticsTemplate(this.#allMoviesCount);
  }
}
