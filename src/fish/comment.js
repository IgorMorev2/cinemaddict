import { COMMENT_EMOTIONS, AUTORS, PARAGRAPH } from './fish-const';
import { generateDate, getRandomValue, generateTextFromParagraph } from '../utils';

const generateComment = () => ({
  autor: getRandomValue(AUTORS),
  comment: generateTextFromParagraph(PARAGRAPH),
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

