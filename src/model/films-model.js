import { generateFilms } from '../fish/film';

export default class FilmsModel {
  films = generateFilms();

  getFilms() {
    return this.films;
  }
}
