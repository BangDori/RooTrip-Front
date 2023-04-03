import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import InvertedTriangle from './InvertedTriangle';

const CustomMarker = ({ map, src, metadata, onMarkerClick }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      const marker = new mapboxgl.Marker(markerRef.current)
        .setLngLat(metadata)
        .addTo(map);

      // 마커 클릭 핸들러 등록
      if (onMarkerClick)
        markerRef.current.addEventListener('click', onMarkerClick);

      // 컴포넌트 언마운트 시 마커 제거
      return () => marker.remove();
    }
  }, [map, metadata, onMarkerClick]);

  return (
    <div ref={markerRef}>
      <InvertedTriangle />
      <div className='map-marker-image'>
        <img
          src={src}
          alt='marker'
          style={{ cursor: onMarkerClick ? 'pointer' : 'initial' }}
        />
      </div>
    </div>
  );
};

export default CustomMarker;
