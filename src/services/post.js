import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';
import { getAccessToken } from '@utils/authCookie';

export async function selectPost() {
  // post 조회
  const posts = axios.get(`${MAIN_SERVER}/api/post`);

  return posts;
}

export async function createPost({ photos, routes, article }) {
  // post 생성
  const accessToken = getAccessToken();

  // eslint-disable-next-line no-console
  console.log(photos, routes, article);

  const result = await axios
    .post(
      `${MAIN_SERVER}/api/post`,
      {
        article,
        newPhotos: photos,
        routes,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
    });
}

export async function deletePost(postId) {
  // post 삭제
  const result = axios.delete(`${MAIN_SERVER}/api/post/${postId}`);
}
