import { createElement } from '../render';
import { createFilmCardInfoTemplate } from '../view/film-card-info-template';
import { createFilmCardControlsTemplate } from '../view/film-card-controls-template';

const createFilmCardTemplate = (film) =>
  `
    <article class="film-card">
      ${createFilmCardInfoTemplate(film)}
      ${createFilmCardControlsTemplate(film)}
    </article>
  `;

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
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
