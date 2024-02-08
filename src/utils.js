import dayjs from 'dayjs';

export const getRandomInteger = (num1, num2) => {
  const min = Math.ceil(Math.min(num1, num2));
  const max = Math.floor(Math.max(num1, num2));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloat = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(
    decimals,
  );

  return parseFloat(str);
};

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

export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export const getRandomArrayFromArray = (oldArray) => shuffleArray(oldArray).slice(0, getRandomInteger(1, oldArray.length));

export const getRandomValue = (array) => array[getRandomInteger(0, array.length - 1)];

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
