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

const useGetRoutes = (markers, MapGLRef) => {
  const { routesIndex, existCoordMarker, routesSource } = useMemo(
    () => makeRoutes(markers),
    [markers],
  );

  useEffect(() => {
    if (existCoordMarker.length !== 0) {
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
    }
  }, [existCoordMarker, MapGLRef]);

  return { routesIndex, routesSource };
};

export default useGetRoutes;
