import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

/**
 * 선택한 마커의 게시글 가져오기
 * @param {String} postId 게시글 아이디
 * @returns
 */
export async function getOnePost(postId) {
  const { status, data, message } = await axios
    .get(`${MAIN_SERVER}/api/post/496f08eb-27bf-46f5-a63b-d07a6f3a1704`)
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return data;
}

/**
 * 게시글 생성
 * @param {String} accessToken
 * @param {Object} post 사진, 경로 순서, 게시글 내용
 * @returns
 */
export async function createPost(accessToken, post) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/post`, post, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return { status, message };
}

export async function deletePost(postId) {
  // post 삭제
  const result = axios.delete(`${MAIN_SERVER}/api/post/${postId}`);
}
