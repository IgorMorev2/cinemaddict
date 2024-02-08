export const createFilmCardControlsTemplate = () =>
  // const { watchList, alreadyWatched, favorite } = film.userDetails;

  // const activeControlClassName = 'film-card__controls-item--active';

  // const watchListClassName = watchList
  //   ? `film-card__controls-item--add-to-watchlist ${activeControlClassName}`
  //   : 'film-card__controls-item--add-to-watchlist';

  // const watchedClassName = alreadyWatched
  //   ? `film-card__controls-item--mark-as-watched ${activeControlClassName}`
  //   : 'film-card__controls-item--mark-as-watched';

  // const favoriteClassName = favorite
  //   ? `film-card__controls-item--favorite ${activeControlClassName}`
  //   : 'film-card__controls-item--favorite';

  `
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist " type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched " type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite " type="button">Mark as favorite</button>
  </div>
  `;
