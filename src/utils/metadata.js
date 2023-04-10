export function getCoord(ref, degree, min, sec) {
  // 남위(S)인 경우 -1, 북위(N)인 경우 1
  // 서경(W)인 경우 -1, 동경(E)인 경우 1
  const sign = ref === 'S' || ref === 'W' ? -1 : 1;

  // 위도 정보 계산
  return sign * (degree + min / 60 + sec / 3600);
}

export function getLocation(
  GPSLatitudeRef,
  GPSLatitude,
  GPSLongitudeRef,
  GPSLongitude,
) {
  const [latDegree, latMin, latSec] = GPSLatitude;
  const [lngDegree, lngMin, lngSec] = GPSLongitude;

  const latitude = getCoord(GPSLatitudeRef, latDegree, latMin, latSec);
  const longitude = getCoord(GPSLongitudeRef, lngDegree, lngMin, lngSec);

  return [latitude, longitude];
}
