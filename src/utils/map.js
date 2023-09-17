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
