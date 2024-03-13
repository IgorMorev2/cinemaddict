import { generateComments } from '../fish/comment';

export default class CommentsModel {
  #allComments = null;
  #filmsModel = null;

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  get = (film) => film.comments.map((commentId) =>
    this.#allComments.find((comment) =>
      comment.id === commentId)
  );

  #generateAllComments() {
    this.#allComments = generateComments(this.#filmsModel.films);
  }
}
