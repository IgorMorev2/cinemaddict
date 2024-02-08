import { getRandomInteger, getRandomFloat, getRandomArrayFromArray, getRandomValue, generateDate, generateTextFromParagraph } from '../utils';
import { FILMS, POSTERS, PARAGRAPH, GENRES, RELEASE_COUNTRIES, AGE_RATING, DIRECTORS, WRITERS, ACTORS } from '../consts';
import { FILMS_COUNT, MAX_COMMENTS_IN_FILM } from '../consts';

const generateFilm = () => ({
  title: getRandomValue(FILMS),
  alternativeTitle: 'Laziness Who Sold Themselves',
  totalRating: getRandomFloat(1, 10, 1),
  poster: getRandomValue(POSTERS),
  ageRating: getRandomValue(AGE_RATING),
  director: getRandomValue(DIRECTORS),
  writers: getRandomArrayFromArray(WRITERS),
  actors: getRandomArrayFromArray(ACTORS),
  release: {
    date: generateDate('2017-01-25'),
    releaseCountry: getRandomValue(RELEASE_COUNTRIES),
  },
  runtime: getRandomInteger(60, 180),
  genres: getRandomArrayFromArray(GENRES),
  description: generateTextFromParagraph(PARAGRAPH),
});

export const generateFilms = () => {
  const films = Array.from({ length: FILMS_COUNT }, generateFilm);

  let totalCommentsCount = 0;

  return films.map((film, index) => {
    const hasComments = Boolean(getRandomInteger(0, 1));

    const filmCommentCount = (hasComments)
      ? getRandomInteger(1, MAX_COMMENTS_IN_FILM)
      : 0;

    totalCommentsCount += filmCommentCount;

    return {
      id: String(index + 1),
      comments: (hasComments)
        ? Array.from(
          { length: filmCommentCount },
          (_value, commentIndex) => String(totalCommentsCount - commentIndex)
        )
        : [],
      filmInfo: film,
    };
  });
};

// userDetails: {
//   watchList: Boolean(getRandomInteger(0, 1)),
//   alreadyWatched: Boolean(getRandomInteger(0, 1)),
//   watchindDate: generateDate('2018-01-25'),
//   favorite: Boolean(getRandomInteger(0, 1)),
// },
