import { json } from 'react-router-dom';

import { MAIN_SERVER } from '@config/server-config';
import store from '@store/configureStore';

const POST_API_SERVER = `${MAIN_SERVER}/api/post`;

/**
 * API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} method HTTP Method
 * @param {Object} data 입력 데이터
 * @returns 응답 객체
 */
async function postAPI(url, method, data) {
  const { user } = store.getState();
  const { accessToken } = user;

  try {
    const response = await fetch(POST_API_SERVER + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
}

/**
 * 게시글 작성 API
 * @param {Object} postForm 게시글
 */
const createPost = async (postForm) => {
  const response = await postAPI('', 'POST', postForm);
  return response;
};

export { createPost };
