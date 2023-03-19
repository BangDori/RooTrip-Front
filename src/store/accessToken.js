import { createAction, handleActions } from 'redux-actions';

const ISSUE = 'EMAIL/ISSUE';
const REMOVE = 'TOKEN/REMOVE';

export const issue = createAction(ISSUE);
export const remove = createAction(REMOVE);

const accessTokenState = '';

const accessToken = handleActions(
  {
    [ISSUE]: (state, action) => action.payload,
    [REMOVE]: (state, action) => '',
  },
  accessTokenState,
);

export default accessToken;
