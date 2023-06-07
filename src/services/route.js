import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

/**
 * 검색한 게시글 보여주기
 * @param {String} accessToken accessToken
 * @param {Array} cities 검색 도시
 * @returns
 */
async function getRecommendPost(accessToken, cities) {
  const { status, data, message } = await axios
    .post(
      `${MAIN_SERVER}/api/route`,
      { cities },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return data;
}

export default getRecommendPost;
