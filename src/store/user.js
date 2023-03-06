import { createAction, handleActions } from 'redux-actions';

// accssToken, refreshToken 저장 필요

const SET_TOKEN = 'token/SET_TOKEN';
const RETURN_TOKEN = 'token/RETURN_TOKEN';

export const setToken = createAction(SET_TOKEN);
export const returnToken = createAction(RETURN_TOKEN);

const initialState = {
  status: false,
};

const user = handleActions(
  {
    [SET_TOKEN]: (state, action) => action.payload,
    [RETURN_TOKEN]: (state, action) => ({
      status: false,
    }),
  },
  initialState,
);

export default user;
