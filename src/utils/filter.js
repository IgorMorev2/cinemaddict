import { FILTER_TYPES } from '../consts';

const filter = {
  [FILTER_TYPES.all]: (films) => films,
  [FILTER_TYPES.watchlist]: (films) => films.filter((film) => film.userDetails.watchList),
  [FILTER_TYPES.history]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FILTER_TYPES.favorites]: (films) => films.filter((film) => film.userDetails.favorite),
};

export { filter };
