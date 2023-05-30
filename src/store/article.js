import { createAction, handleActions } from 'redux-actions';

const LOAD = 'ARTICLE/LOAD';
const EXIT = 'ARTICLE/EXIT';

export const load = createAction(LOAD);
export const exit = createAction(EXIT);

const articleState = {
  id: '',
};

const article = handleActions(
  {
    [LOAD]: (state, { payload }) => ({
      id: payload.id,
    }),
    [EXIT]: (state, action) => ({ id: '' }),
  },
  articleState,
);

export default article;
