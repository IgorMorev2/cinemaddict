export const getRandomInteger = (num1, num2) => {
  const min = Math.ceil(Math.min(num1, num2));
  const max = Math.floor(Math.max(num1, num2));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloat = (min, max, decimals = 1) => {
  const str = (Math.random() * (max - min) + min).toFixed(
    decimals,
  );

  return parseFloat(str);
};

export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export const getRandomValue = (array) => array[getRandomInteger(0, array.length - 1)];

export const getRandomArrayFromArray = (oldArray) => shuffleArray(oldArray).slice(0, getRandomInteger(1, oldArray.length));

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
