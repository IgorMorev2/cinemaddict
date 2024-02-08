import { humanizeDate, humanizeTime, getPeopleListTemplate } from '../utils';

export const createFilmDetailsInfoTemplate = (film) => {
  const { filmInfo } = film;
  const { title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, release, runtime, genres, description } = filmInfo;
  const { date, releaseCountry } = release;

  const getGenresTemplate = () => {
    let genresTemplate = '';

    genres.forEach((genre) => {
      genresTemplate += `<span class="film-details__genre">${genre}</span>`;
    });

    return genresTemplate;
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

  return `
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./${poster}" alt="">

        <p class="film-details__age">${ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${getPeopleListTemplate(writers)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${getPeopleListTemplate(actors)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${humanizeDate(date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${humanizeTime(runtime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">${getGenresTemplate()}</td>
          </tr>
        </table>

        <p class="film-details__film-description">${description}</p>
      </div>
    </div>
  `;
};
