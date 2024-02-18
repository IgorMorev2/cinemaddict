import { generateFilms } from '../fish/film';

export default class FilmsModel {
  #films = generateFilms();

  get films() {
    return this.#films;
  }
}
