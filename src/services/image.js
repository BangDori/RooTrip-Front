import { MAIN_SERVER } from '@config/setting';
import axios from 'axios';

/**
 * 행정구역을 받아오기 위한 함수
 * @param {*} latitude 위도
 * @param {*} longitude 경도
 * @returns 행정구역
 */
export async function getAddress(latitude, longitude) {
  try {
    const point = await axios
      .get(
        `${MAIN_SERVER}/api/photo/reverse?latitude=${latitude}&longitude=${longitude}`,
      )
      .then((res) => {
        return `${res.data.city} ${res.data.first}`;
      });

    return point;
  } catch (e) {
    return e;
  }
}

/**
 * AWS S3 pre-signed url을 받아오기 위한 함수
 * @returns pre-signed url
 */
export async function getPreSignedUrl(fileNames) {
  try {
    const url = await axios
      .post(`${MAIN_SERVER}/api/photo/signed`, fileNames)
      .then((res) => res.data);

    return url;
  } catch (e) {
    return e;
  }
}

/**
 * Pre-signed Url에 파일 업로드하기
 * @param {*} file 파일
 * @param {*} preSignedUrl Pre-signed url
 * @returns 파일이 업로드된 주소
 */
export async function uploadFileToS3(file, preSignedUrl) {
  try {
    const res = await fetch(
      new Request(preSignedUrl, {
        method: 'PUT',
        body: file,
        headers: new Headers({
          'Content-Type': 'image/jgeg',
        }),
      }),
    );

    return res;
  } catch (e) {
    return e;
  }
}
