/**
 * Polygon 경계 반환 함수
 * @param {Number} lng1 longitude_x
 * @param {Number} lat1 latitude_x
 * @param {Number} lng2 longitude_y
 * @param {Number} lat2 latitude_y
 * @returns
 */
export function getPolygonBoundary(lng1, lat1, lng2, lat2) {
  const polygon = `Polygon((${lat1} ${lng1}, ${lat2} ${lng2}, ${lat2} ${lng1}, ${lat1} ${lng1}))`;
  return polygon;
}

/**
 * 지도의 현재 뷰를 변경하는 상호작용 함수
 * @param {Object} markers
 * @returns
 */
export function changeCityToCoordinate(markers) {
  let totalLng = 0;
  let totalLat = 0;
  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  markers.forEach((marker) => {
    if (marker === null) return;

    const { longitude: lng, latitude: lat } = marker.coordinate;
    totalLng += lng;
    totalLat += lat;

    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });

  // 경도와 위도 범위 계산
  const lngRange = maxLng - minLng;
  const latRange = maxLat - minLat;

  // zoom level 설정
  let zoom = 9;
  let weight = 0;

  if (lngRange > 2.5 || latRange > 3.5) {
    weight = 2.75;
    zoom = 6; // 매우 넓은 범위일 때
  } else if (lngRange > 1 || latRange > 2) {
    weight = 1.3;
    zoom = 7; // 중간 범위일 때
  } else {
    if (markers[0].name) {
      if (markers[0].name.endsWith('도') || markers[0].name === '광주')
        zoom = 8;
      else zoom = 9;
    }

    weight = 0.5;
  }

  const avgLng = totalLng / markers.length;
  const avgLat = totalLat / markers.length;

  return { center: [avgLng + weight, avgLat], zoom };
}
