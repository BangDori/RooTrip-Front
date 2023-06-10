import { createAction, handleActions } from 'redux-actions';

const LOAD = 'ARTICLE/LOAD';
const EXIT = 'ARTICLE/EXIT';

export const load = createAction(LOAD);
export const exit = createAction(EXIT);

const articleState = {
  postId: '',
};

const article = handleActions(
  {
    [LOAD]: (state, { payload }) => ({
      postId: payload.postId,
    }),
    [EXIT]: (state, action) => ({ postId: '' }),
  },
  articleState,
);

export default article;
