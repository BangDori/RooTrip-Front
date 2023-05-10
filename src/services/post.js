import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

export async function selectPost() {
  // post 조회
  const posts = axios.get(`${MAIN_SERVER}/api/post`);

  return posts;
}

/**
 * 게시글 생성
 * @param {*} accessToken
 * @param {*} post 사진, 경로 순서, 게시글 내용
 * @returns
 */
export async function createPost(accessToken, post) {
  try {
    const { status, message } = await axios
      .post(`${MAIN_SERVER}/api/post`, post, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    return status ? message : new Error(message);
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function deletePost(postId) {
  // post 삭제
  const result = axios.delete(`${MAIN_SERVER}/api/post/${postId}`);
}
