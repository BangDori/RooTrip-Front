import { useMemo } from 'react';

function makeRoutes(markers) {
  const routesIndex = markers
    .map((marker, idx) => (marker.status === 'specified' ? idx : null))
    .filter((marker) => marker !== null);

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

  return { routesIndex, routesSource };
}

const useGetRoutes = (markers) => {
  const { routesIndex, routesSource } = useMemo(
    () => makeRoutes(markers),
    [markers],
  );

  return { routesIndex, routesSource };
};

export default useGetRoutes;
