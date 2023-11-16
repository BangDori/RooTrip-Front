import { useEffect, useMemo } from 'react';

import { changeCityToCoordinate } from '@utils/map';

function makeRoutes(markers) {
  const routesIndex = markers
    .map((marker, idx) => (marker.status === 'specified' ? idx : null))
    .filter((marker) => marker !== null);

  const existCoordMarker = markers.filter(
    (marker) => marker.status === 'specified',
  );

  const routesMarker = markers
    .filter((marker) => marker.status !== 'unspecified')
    .map((marker) => {
      const { latitude, longitude } = marker.coordinate;
      return [longitude, latitude];
    });

  // 경로 표시
  const routesSource = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [...routesMarker],
    },
  };

  return { routesIndex, existCoordMarker, routesSource };
}

const useGetRoutes = (markers, MapGLRef, type) => {
  const { routesIndex, existCoordMarker, routesSource } = useMemo(
    () => makeRoutes(markers),
    [markers],
  );

  // Routes 진행 시, 지도 확대
  useEffect(() => {
    if (type === 'WRITE' && existCoordMarker.length !== 0) {
      const { center, zoom } = changeCityToCoordinate(existCoordMarker);

      MapGLRef.current.flyTo({
        center,
        zoom,
        speed: 1.5,
        curve: 1.25,
        essential: true,
        easing(t) {
          return t;
        },
      });

      // Routes 종료 시, 지도 초기 상태로 복귀
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        MapGLRef.current.flyTo({
          center: [131.1, 36.4395],
          zoom: 5.5,
          speed: 1.5,
          curve: 1.25,
          essential: true,
          easing(t) {
            return t;
          },
        });
      };
    }
  }, [type, existCoordMarker, MapGLRef]);

  return { routesIndex, routesSource };
};

export default useGetRoutes;
