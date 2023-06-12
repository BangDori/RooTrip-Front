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

export function changeQueryBounds({ _sw, _ne }) {
  const { lat: lat1, lng: lng1 } = _sw;
  const { lat: lat2, lng: lng2 } = _ne;

  const polygon = `Polygon((${lat1} ${lng1}, ${lat2} ${lng2}, ${lat2} ${lng1}, ${lat1} ${lng1}))`;
  return polygon;
}

export function changeCityToCoordinate(cities) {
  let totalLng = 0;
  let totalLat = 0;
  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  cities.forEach((city) => {
    let coordinate;

    switch (city) {
      case '서울':
        coordinate = [126.978, 37.5665];
        break;
      case '강원도':
        coordinate = [128.2092, 37.5555];
        break;
      case '경기도':
        coordinate = [127.5183, 37.4138];
        break;
      case '경상남도':
        coordinate = [128.6921, 35.2383];
        break;
      case '경상북도':
        coordinate = [128.8889, 36.4919];
        break;
      case '광주':
        coordinate = [126.8526, 35.1595];
        break;
      case '대구':
        coordinate = [128.6014, 35.8714];
        break;
      case '대전':
        coordinate = [127.3845, 36.3504];
        break;
      case '부산':
        coordinate = [129.0756, 35.1796];
        break;
      case '세종':
        coordinate = [127.2892, 36.4808];
        break;
      case '울산':
        coordinate = [129.3114, 35.5384];
        break;
      case '전라남도':
        coordinate = [126.991, 34.8679];
        break;
      case '전라북도':
        coordinate = [127.153, 35.7175];
        break;
      case '제주도':
        coordinate = [126.5312, 33.4996];
        break;
      case '충청남도':
        coordinate = [126.8, 36.5184];
        break;
      case '충청북도':
        coordinate = [127.9295, 36.6282];
        break;
      case '인천':
        coordinate = [126.7052, 37.4563];
        break;
      default:
        coordinate = [0, 0];
        break;
    }

    if (coordinate) {
      const [lng, lat] = coordinate;
      totalLng += lng;
      totalLat += lat;

      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    }
  });

  // 경도와 위도 범위 계산
  const lngRange = maxLng - minLng;
  const latRange = maxLat - minLat;

  // zoom level 설정
  let zoom = 5.5;
  let weight = 0;

  if (lngRange > 2.5 || latRange > 3.5) {
    weight = 2.75;
    zoom = 6; // 매우 넓은 범위일 때
  } else if (lngRange > 1 || latRange > 2) {
    weight = 1.3;
    zoom = 7; // 중간 범위일 때
  } else {
    zoom = 8 + (cities.length === 1 ? 0.5 : 0); // 좁은 범위일 때

    if (cities[0].endsWith('도')) zoom -= 0.5;
    weight = 0.5;
  }

  const avgLng = totalLng / cities.length;
  const avgLat = totalLat / cities.length;

  return { center: [avgLng + weight, avgLat], zoom };
}
