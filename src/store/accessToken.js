import { createAction, handleActions } from 'redux-actions';

const ISSUE = 'EMAIL/ISSUE';
const REMOVE = 'TOKEN/REMOVE';

export const issue = createAction(ISSUE);
export const remove = createAction(REMOVE);

const accessTokenState = {
  accessToken: '',
  expireTime: 15 * 60 * 1000,
};

const accessToken = handleActions(
  {
    [ISSUE]: (state, action) => ({ ...state, accessToken: action.payload }),
    [REMOVE]: (state, action) => ({ ...state, accessToken: '' }),
  },
  accessTokenState,
);

export default accessToken;
