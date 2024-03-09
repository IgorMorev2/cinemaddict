import { filter } from '../utils/filter';

export const generateFilter = (films) => Object.entries(filter).map(
  ([filterName, filterFilms]) => ({
    name: filterName,
    count: filterFilms(films).length,
  })
);
