import React, { useCallback, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import InvertedTriangle from './InvertedTriangle';

const CustomMarker = ({ map, src, metadata, accessToken }) => {
  const markerRef = useRef(null);

  /**
   * Marker click event
   * Marker active & load Article
   */
  const onMarkerClick = useCallback((e) => {
    // console.log(metadata);
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      const marker = new mapboxgl.Marker(markerRef.current)
        .setLngLat(metadata)
        .addTo(map);

      // 마커 클릭 핸들러 등록
      if (accessToken)
        markerRef.current.addEventListener('click', onMarkerClick);

      // 컴포넌트 언마운트 시 마커 제거
      return () => {
        if (marker) marker.remove();
      };
    }

    return null;
  }, []);

  return (
    <div ref={markerRef}>
      <InvertedTriangle />
      <div className='map-marker-image'>
        <img
          src={src}
          alt='marker'
          style={{ cursor: accessToken ? 'pointer' : 'initial' }}
        />
      </div>
    </div>
  );
};

export default CustomMarker;
