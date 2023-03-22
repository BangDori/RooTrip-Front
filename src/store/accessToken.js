import { createAction, handleActions } from 'redux-actions';

const ISSUE = 'EMAIL/ISSUE';
const REMOVE = 'TOKEN/REMOVE';

export const issue = createAction(ISSUE);
export const remove = createAction(REMOVE);

const accessTokenState = {
  accessToken: '',
  expireTime: 14 * 60 * 1000, // Client = 14m, Server = 15m
};

const accessToken = handleActions(
  {
    [ISSUE]: (state, { payload: token }) => ({
      accessToken: token.accessToken,
      expireTime: (token.expire - 60) * 1000, // 원활한 통신을 위해 Client 만료 시간 14분으로 설정
    }),
    [REMOVE]: (state, action) => ({ accessToken: '', expireTime: 0 }), // Token 초기화
  },
  accessTokenState,
);

export default accessToken;
