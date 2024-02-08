import { generateComments } from '../fish/comment';

export default class CommentsModel {
  constructor(filmsModel) {
    this.filmsModel = filmsModel;
    this.generateAllComments();
  }

  generateAllComments() {
    // console.log(this.filmsModel.getFilms());
    this.allComments = generateComments(this.filmsModel.getFilms());
  }

  getComments(film) {
    this.comments = film.comments.map((commentId) =>
      this.allComments.find((comment) =>
        comment.id === commentId)
    );

    return this.comments;
  }
}


// export default class CommentsModel {
//   filmsModel = null;
//   allComments = [];
//   comments = [];

//   constructor(filmsModel) {
//     this.filmsModel = filmsModel;
//     this.generateAllComments();
//   }

//   generateAllComments() {
//     this.allComments = generateComments(this.filmsModel.get());
//   }

//   get = (film) => {
//     this.comments = film.comments.map((commentId) =>
//       this.allComments.find((comment) =>
//         comment.id === commentId)
//     );

//     return this.comments;
//   };
// }
