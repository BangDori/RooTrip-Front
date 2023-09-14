import { getExpiration } from '@utils/token';
import { reIssueAPI } from '@services/auth';

import { reIssueAPICall } from '../api';

const reIssue =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== reIssueAPICall.type) return next(action);

    const { type, refreshtoken } = action.payload;

    const reIssueForm = {
      grant_type: 'refresh_token',
      refresh_token: refreshtoken,
    };
    const response = await reIssueAPI(reIssueForm);
    const resData = await response.json();

    const { accessToken, expire } = resData.data;

    const expiration = getExpiration(expire);
    const tokens = { accessToken, expiration };
    return dispatch({ type, payload: tokens });
  };

export default reIssue;
