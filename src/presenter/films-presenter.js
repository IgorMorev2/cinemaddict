import { render } from '../render';

import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreButtonView from '../view/show-more-button-view';
// import FilmDetailsView from '../view/film-details-view';

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();

  init = (container, filmsModel, commentsModel) => {
    this.container = container;
    this.filmsModel = filmsModel;
    this.filmsList = [...this.filmsModel.films];
    this.commentsModel = commentsModel;


    render(new SortView(), this.container);
    render(this.#filmsComponent, this.container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < this.filmsList.length; i++) {
      render(new FilmCardView(this.filmsList[i]), this.#filmsListContainerComponent.element); //
    }

    // const comments = [...this.commentsModel.comments(this.filmsList[0])];

    render(new ShowMoreButtonView(), this.#filmsListComponent.element);
    // render(new FilmDetailsView(this.filmsList[0], comments), this.container.parentElement);
  };
}
