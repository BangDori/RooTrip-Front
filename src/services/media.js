import { json } from 'react-router-dom';

import { MAIN_SERVER } from '@config/server-config';
import store from '@store/configureStore';

const MEDIA_API_SERVER = `${MAIN_SERVER}/api/photo`;

/**
 * API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} method HTTP Method
 * @param {Object} data 입력 데이터
 * @returns 응답 객체
 */
async function mediaAPI(url, method, data) {
  const { user } = store.getState();
  const { accessToken } = user;

  try {
    const response = await fetch(MEDIA_API_SERVER + url, {
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
const getPreSignedUrl = async (fileNames) => {
  const response = await mediaAPI('/signed', 'POST', fileNames);
  return response;
};

/**
 * Pre-signed Url에 파일 업로드하기
 * @param {String} preSignedUrl Pre-signed url
 * @param {Object} file 파일
 */
const uploadFileToS3 = async (preSignedUrl, file) => {
  try {
    await fetch(preSignedUrl, {
      mode: 'cors',
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: file,
    });
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
};

export { getPreSignedUrl, uploadFileToS3 };
