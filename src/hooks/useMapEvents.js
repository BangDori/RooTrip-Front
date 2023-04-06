import { useCallback, useRef } from 'react';

const useMapEvents = ({ map }) => {
  const hoveredStateId = useRef(null);

  const onMapClick = useCallback(
    (e) => {
      const zoom = map.current.getZoom();
      const { lngLat } = e;

      map.current.flyTo({
        essential: true,
        center: lngLat,
        zoom: zoom + 1,
        speed: 1.25,
        easing: (t) => t,
      });
    },
    [map],
  );

  const onMapMove = useCallback(
    (e) => {
      map.current.getCanvas().style.cursor = 'pointer';

      const { sourceLayer, id } = e.features[0];
      map.current.setFeatureState(
        {
          source: 'composite',
          sourceLayer: sourceLayer,
          id: id,
        },
        { hover: true },
      );

      if (hoveredStateId.current !== id) {
        map.current.setFeatureState(
          {
            source: 'composite',
            sourceLayer: sourceLayer,
            id: hoveredStateId.current,
          },
          { hover: false },
        );
      }

      hoveredStateId.current = id;
    },
    [map],
  );

  const onMapLeave = useCallback(() => {
    map.current.getCanvas().style.cursor = 'initial';

    if (hoveredStateId.current !== null) {
      map.current.setFeatureState(
        {
          source: 'composite',
          sourceLayer: 'Korea_Level1-72rlhs',
          id: hoveredStateId.current,
        },
        { hover: false },
      );
    }
  }, [map]);

  const onMapLoad = useCallback(() => {
    map.current.on('click', 'korea-fill', onMapClick);
    map.current.on('mousemove', 'korea-fill', onMapMove);
    map.current.on('mouseleave', 'korea-fill', onMapLeave);

    return () => {
      map.current.off('click', 'korea-fill', onMapClick);
      map.current.off('mousemove', 'korea-fill', onMapMove);
      map.current.off('mouseleave', 'korea-fill', onMapLeave);
    };
  }, [map, onMapClick, onMapMove, onMapLeave]);

  const onMapUnload = useCallback(() => {
    map.current.setPaintProperty('korea-fill', 'fill-opacity', 1);
  }, [map]);

  return {
    onMapLoad,
    onMapUnload,
  };
};

export default useMapEvents;
