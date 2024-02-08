import { humanizeTime, getYearFromDate } from '../utils';

export const createFilmCardInfoTemplate = (film) => {
  const { comments, filmInfo } = film;
  const { title, totalRating, poster, description, runtime, genres, release} = filmInfo;
  const { date } = release;

  const visibleDescription = description.length > 140
    ? `${description.slice(0, 139)}...`
    : description;

  const duration = humanizeTime(runtime);

  return `
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getYearFromDate(date)}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${visibleDescription}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
  `;
};

// title: getRandomValue(FILMS),
// alternativeTitle: 'Laziness Who Sold Themselves',
// totalRating: getRandomFloat(1, 10, 1),
// poster: getRandomValue(POSTERS),
// ageRating: getRandomValue(AGE_RATING),
// director: getRandomValue(DIRECTORS),
// writers: getRandomArrayFromArray(WRITERS),
// actors: getRandomArrayFromArray(ACTORS),
// release: {
//   date: generateDate('2017-01-25'),
//   releaseCountry: getRandomValue(RELEASE_COUNTRIES),
// },
// runtime: getRandomInteger(60, 180),
// genre: getRandomArrayFromArray(GENRES),
// description: generateTextFromParagraph(PARAGRAPH),
