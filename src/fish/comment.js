import { AUTORS, PARAGRAPH } from './fish-const';
import { generateDate, generateTextFromParagraph } from '../utils/data';
import { getRandomValue } from '../utils/common';
import { COMMENT_EMOTIONS } from '../consts';

const generateComment = () => ({
  autor: getRandomValue(AUTORS),
  text: generateTextFromParagraph(PARAGRAPH),
  date: generateDate(),
  emotion: getRandomValue(COMMENT_EMOTIONS),
});

const getCommentCount = (films) => films.reduce((count, film) => count + film.comments.length, 0);

export const generateComments = (films) => {
  const commentCount = getCommentCount(films);

  return Array.from({ length: commentCount }, (_value, index) => {
    const commentItem = generateComment();

    return {
      id: String(index + 1),
      ...commentItem,
    };
  });
};

