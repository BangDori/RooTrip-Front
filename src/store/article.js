import { createAction, handleActions } from 'redux-actions';

const LOAD = 'ARTICLE/LOAD';
const EXIT = 'ARTICLE/EXIT';

export const loadArticle = createAction(LOAD);
export const exit = createAction(EXIT);

const articleState = {
  postId: '',
};

const article = handleActions(
  {
    [LOAD]: (state, { payload }) => ({
      postId: payload.postId,
    }),
    [EXIT]: (state, action) => articleState,
  },
  articleState,
);

export default article;
