import { createAction, handleActions } from 'redux-actions';

const INIT = 'EMAIL/INIT';
const SEND = 'EMAIL/AUTH';

export const init = createAction(INIT);
export const send = createAction(SEND);

const initialState = false;

const emailAuth = handleActions(
  {
    [INIT]: (state, action) => false,
    [SEND]: (state, action) => true,
  },
  initialState,
);

export default emailAuth;
