import AbstractView from '../framework/view/abstract-view';

export default class StatisticsView extends AbstractView {
  #createStatisticsTemplate = () => '<p>130 291 movies inside</p>';

  get template() {
    return this.#createStatisticsTemplate();
  }
}
