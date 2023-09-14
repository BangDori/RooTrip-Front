import { useMemo } from 'react';

function makeRoutes(markers) {
  const routesMarker = markers
    .filter((marker) => marker.status !== 'unspecified')
    .map((marker) => {
      const { latitude, longitude } = marker.coordinate;
      return [longitude, latitude];
    });

  // 경로 표시
  const routes = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [...routesMarker],
    },
  };

  return routes;
}

const useGetRoutes = (markers) => {
  const routes = useMemo(() => makeRoutes(markers), [markers]);

  return { routes };
};

export default useGetRoutes;
