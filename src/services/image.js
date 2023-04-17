import { MAIN_SERVER } from '@config/setting';
import axios from 'axios';

/**
 * 행정구역을 받아오기 위한 함수
 * @param {*} latitude 위도
 * @param {*} longitude 경도
 * @returns 행정구역
 */
async function getAddress(latitude, longitude) {
  const point = await axios
    .get(
      `${MAIN_SERVER}/api/photo/reverse?latitude=${latitude}&longitude=${longitude}`,
    )
    .then((res) => {
      return `${res.data.city} ${res.data.first}`;
    });

  return point;
}

export default getAddress;
