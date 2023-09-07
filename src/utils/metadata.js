/**
 * GPS 좌표 정보를 받아서, 도(degree), 분(minute), 초(second)로 표현된 값을 계산합니다.
 *
 * @param {string} ref - 'S'(남위) 또는 'N'(북위), 'W'(서경) 또는 'E'(동경) 중 하나
 * @param {number} degree - 도 단위의 값
 * @param {number} min - 분 단위의 값
 * @param {number} sec - 초 단위의 값
 * @returns {number} - 계산된 좌표 값 (도 단위)
 */
export function getCoord(ref, degree, min, sec) {
  // 남위(S)인 경우 -1, 북위(N)인 경우 1
  // 서경(W)인 경우 -1, 동경(E)인 경우 1
  const sign = ref === 'S' || ref === 'W' ? -1 : 1;

  // 위도 정보 계산
  return sign * (degree + min / 60 + sec / 3600);
}

/**
 * GPS 좌표 정보를 받아서 위도와 경도로 변환합니다.
 *
 * @param {string} GPSLatitudeRef - 'S'(남위) 또는 'N'(북위)
 * @param {number[]} GPSLatitude - [도, 분, 초] 형태의 위도 정보 배열
 * @param {string} GPSLongitudeRef - 'W'(서경) 또는 'E'(동경)
 * @param {number[]} GPSLongitude - [도, 분, 초] 형태의 경도 정보 배열
 * @returns {number[]} - [위도, 경도] 형태의 좌표 정보 배열
 */
export function getLocation(
  GPSLatitudeRef,
  GPSLatitude,
  GPSLongitudeRef,
  GPSLongitude,
) {
  // 위도 및 경도 정보 추출
  const [latDegree, latMin, latSec] = GPSLatitude;
  const [lngDegree, lngMin, lngSec] = GPSLongitude;

  // getCoord 함수를 사용하여 위도와 경도를 계산하고 반환
  const latitude = getCoord(GPSLatitudeRef, latDegree, latMin, latSec);
  const longitude = getCoord(GPSLongitudeRef, lngDegree, lngMin, lngSec);

  return [latitude, longitude];
}
