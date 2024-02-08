import { createElement } from '../render';
import { createFilmDetailsInfoTemplate } from '../view/film-details-info-template';
import { createFilmDetailsControlsTemplate } from '../view/film-details-controls-template';
import { createFilmDetailsCommentsTemplate } from '../view/film-details-comments-template';
import { createFilmDetailsFormTemplate } from '../view/film-details-form-template';

const createFilmDetailsTemplate = (film, comments) =>
  `
    <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>

        ${createFilmDetailsInfoTemplate(film)}
        ${createFilmDetailsControlsTemplate()}

      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

          ${createFilmDetailsCommentsTemplate(comments)}
          ${createFilmDetailsFormTemplate()}

        </section>
      </div>
    </form>
  </section>
  `;

export default class FilmDetailsView {
  constructor(film, comments) {
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this.film, this.comments);
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
