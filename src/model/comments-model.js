import { generateComments } from '../fish/comment';

export default class CommentsModel {
  #comments = null;
  #allComments = null;
  #filmsModel = null;

  #generateAllComments() {
    this.#allComments = generateComments(this.#filmsModel.films);
  }

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  get comments() {
    return this.#comments;
  }

  set comments(film) {
    this.#comments = film.comments.map((commentId) =>
      this.#allComments.find((comment) =>
        comment.id === commentId)
    );
  }
}
