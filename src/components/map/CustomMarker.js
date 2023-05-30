import React, { useCallback, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useDispatch } from 'react-redux';
import { load } from '@store/article';

const InvertedTriangle = () => (
  <svg
    width='32'
    height='40'
    viewBox='0 0 174 195'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4.89372 194.124C2.61773 195.521 -0.235684 193.574 0.331282 191.012L41.9368 2.95425C42.397 0.873958 44.876 -0.0896543 46.6514 1.12161L172.064 86.6836C173.84 87.8949 173.76 90.4951 171.912 91.6289L4.89372 194.124Z'
      fill='white'
      transform='rotate(-36 87 87)'
    />
  </svg>
);

const CustomMarker = ({ map, id, src, coordinate, accessToken }) => {
  const markerRef = useRef(null);
  const dispatch = useDispatch();

  /**
   * Marker click event
   * Marker active & load Article
   */
  const onMarkerClick = useCallback(
    () => dispatch(load({ id })),
    [id, dispatch],
  );

  useEffect(() => {
    if (markerRef.current) {
      const marker = new mapboxgl.Marker(markerRef.current)
        .setLngLat(coordinate)
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
  }, [src, accessToken, map, coordinate, onMarkerClick]);

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
