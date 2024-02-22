import { generateFilms } from '../fish/film';

export default class FilmsModel {
  #films = null;

  constructor() {
    this.#films = generateFilms();
  }

  get films() {
    return this.#films;
  }
}
