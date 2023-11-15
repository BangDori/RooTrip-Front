import { json } from 'react-router-dom';

import { MAIN_SERVER } from '@config/server-config';
import store from '@store/configureStore';

const PHOTO_API_SERVER = `${MAIN_SERVER}/api/photo`;

/**
 * API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} method HTTP Method
 * @param {Object} data 입력 데이터
 * @returns 응답 객체
 */
async function photoAPI(url, method, data) {
  const { user } = store.getState();
  const { accessToken } = user;

  try {
    const response = await fetch(PHOTO_API_SERVER + url, {
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
 * 좌표를 주소로 변경해주는 API
 * @param {Object} postForm 게시글
 */
const getReverseAddress = async (lat, lng) => {
  const response = await photoAPI(
    `/reverse?latitude=${lat}&longitude=${lng}`,
    'GET',
  );

  const resData = await response.json();
  const { city, first, second, third } = resData.data.address;

  const address = `${city} ${first} ${second} ${third}`;

  return address;
};

export { getReverseAddress };
