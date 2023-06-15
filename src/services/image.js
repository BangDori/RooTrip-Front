import { MAIN_SERVER } from '@config/setting';
import axios from 'axios';

/**
 * 행정구역을 받아오기 위한 함수
 * @param {*} latitude 위도
 * @param {*} longitude 경도
 * @returns 행정구역
 */
export async function getAddress(latitude, longitude) {
  const {
    status,
    data: address,
    message,
  } = await axios
    .get(
      `${MAIN_SERVER}/api/photo/reverse?latitude=${latitude}&longitude=${longitude}`,
    )
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return `${address.city} ${address.first}`;
}

/**
 * AWS S3 pre-signed url을 받아오기 위한 함수
 * @param {String} fileNames 파일 이름
 * @returns preSignedUrl
 */
export async function getPreSignedUrl(fileNames) {
  const {
    status,
    data: url,
    message,
  } = await axios
    .post(`${MAIN_SERVER}/api/photo/signed`, fileNames)
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return url;
}

/**
 * Pre-signed Url에 파일 업로드하기
 * @param {Object} file 파일
 * @param {String} preSignedUrl Pre-signed url
 */
export async function uploadFileToS3(formData, preSignedUrl) {
  await axios
    .put(preSignedUrl, formData)
    .then((res) => res.request.responseURL)
    .catch((e) => new Error(e.message));
}

/**
 * 프로필 사진 변경
 * @param {String} profileImage Pre-signed url
 */
export async function uploadProfileToS3(profileImage, accessToken) {
  // console.log(profileImage);
  const { status, message, ...token } = await axios
    .post(
      `${MAIN_SERVER}/api/mypage/account/edit/profile/image`,
      profileImage,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => res.request.responseURL)
    .catch((e) => new Error(e.message));
  // console.log(status);
  if (!status) throw new Error(message);

  return status;
}
