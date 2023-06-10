import React, { useCallback, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useDispatch, useSelector } from 'react-redux';

import { removeOnStore } from '@store/marker';
import { load, exit } from '@store/article';
import Menu from '@constants/menu';

const InvertedTriangle = ({ isClick }) => (
  <svg
    width='32'
    height='40'
    viewBox='0 0 174 195'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      className={isClick ? 'clicked' : ''}
      d='M4.89372 194.124C2.61773 195.521 -0.235684 193.574 0.331282 191.012L41.9368 2.95425C42.397 0.873958 44.876 -0.0896543 46.6514 1.12161L172.064 86.6836C173.84 87.8949 173.76 90.4951 171.912 91.6289L4.89372 194.124Z'
      fill='white'
      transform='rotate(-36 87 87)'
    />
  </svg>
);

const CustomMarker = ({ map, id, src, coordinate, accessToken }) => {
  const markerRef = useRef(null);
  const dispatch = useDispatch();
  const { id: clickedId } = useSelector((state) => state.article);
  const { removeID } = useSelector((state) => state.marker);
  const clickedMenu = useSelector((state) => state.menu);
  const isClick = id === clickedId;

  useEffect(() => {
    if (id === removeID) {
      // markerRef.current = null;
      dispatch(exit());
      dispatch(removeOnStore({ id }));
    }
  }, [dispatch, removeID, id]);

  /**
   * Marker click event
   * Marker active & load Article
   */
  const onMarkerClick = useCallback(
    () => dispatch(load({ id })),
    [id, dispatch],
  );

  useEffect(
    // eslint-disable-next-line consistent-return
    () => {
      if (markerRef.current && clickedMenu === Menu.TRIP) {
        const marker = new mapboxgl.Marker().setLngLat(coordinate).addTo(map);

        // 마커 클릭 핸들러 등록
        if (accessToken)
          marker.getElement().addEventListener('click', onMarkerClick);

        // 컴포넌트 언마운트 시 마커 제거
        return () => {
          if (marker) marker.remove();
        };
      }
    },
    [accessToken, map, coordinate, clickedMenu, onMarkerClick],
  );

  return (
    <div ref={markerRef}>
      <InvertedTriangle isClick={isClick} />
      <div className='map-marker-image'>
        <img
          className={isClick ? 'clicked' : ''}
          src={src}
          alt='marker'
          style={{ cursor: accessToken ? 'pointer' : 'initial' }}
        />
      </div>
    </div>
  );
};

export default CustomMarker;
