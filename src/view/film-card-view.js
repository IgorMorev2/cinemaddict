import { createElement } from '../render';
import { createFilmCardInfoTemplate } from '../view/film-card-info-template';
import { createFilmCardControlsTemplate } from '../view/film-card-controls-template';

const createFilmCardTemplate = () =>
  `
    <article class="film-card">
      ${createFilmCardInfoTemplate()}
      ${createFilmCardControlsTemplate()}
    </article>
  `;

export default class FilmCardView {
  getTemplate() {
    return createFilmCardTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
