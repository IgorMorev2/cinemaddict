export const FILMS_COUNT = 17;

export const FILMS_COUNT_PER_STER = 5;

export const MAX_COMMENTS_IN_FILM = 18;

export const TITLE_TEXT = {
  defaultText: 'All movies. Upcoming',
  emptyText: {
    allMovies: 'There are no movies in our database',
    watchlist: 'There are no movies to watch now',
    history: 'There are no watched movies now',
    favorites: 'There are no favorite movies now',
  }
};

export const FILTER_TYPES = {
  all: 'All',
  watchlist: 'Watchlist',
  history: 'History',
  favorites: 'Favorites',
};

export const PROFILE_RATING = [
  {
    name: 'novice',
    lowerLimit: 1,
  },
  {
    name: 'fan',
    lowerLimit: 11,
  },
  {
    name: 'movie buff',
    lowerLimit: 21,
  },
];

export const SORT_TYPES = {
  default: 'default',
  date: 'date',
  rating: 'rating',
};
