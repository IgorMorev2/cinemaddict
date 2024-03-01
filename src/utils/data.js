import dayjs from 'dayjs';
import { getRandomInteger } from './common';

export const humanizeDate = (date) => dayjs(date).format('D MMMM YYYY');

export const getYearFromDate = (date) => dayjs(date).format('YYYY');

export const humanizeTime = (minutes) => {

  if (minutes < 60) {
    return `${minutes}m`;
  } else if (minutes === 60) {
    return '1h';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
};

export const generateDate = (date = undefined) => {
  const maxMonthsGap = 7;
  const monthGap = getRandomInteger(-maxMonthsGap, maxMonthsGap);

  return dayjs(date).add(monthGap, 'year').toDate();
};

export const generateTextFromParagraph = (paragraph) => {
  const sentencesesDescription = paragraph.split('. ');
  let newDescription = '';

  for (let i = 0; i < getRandomInteger(1, sentencesesDescription.length - 1); i++) {
    newDescription += sentencesesDescription[i];
  }

  return newDescription;
};

export const getPeopleListTemplate = (people) => people.join(', ');
