import React, { useCallback, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMediaQuery } from 'react-responsive';
const CustomMarker = loadable(() => import('./map/CustomMarker'));
const LoginMarker = loadable(() => import('./map/LoginMarker'));

const MAP_TOKEN = process.env.REACT_APP_MAP_API_TOKEN;
const MAP_STYLE = process.env.REACT_APP_MAP_API_STYLE;

const Map = () => {
  const isBig_PC = useMediaQuery({ query: '(min-width:1681px)' });
  const isSmall_PC = useMediaQuery({
    query: '(min-width:1025px) and (max-width: 1680px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width: 1024px)',
  });

  const { accessToken } = useSelector((state) => state.accessToken);

  const [viewport_BP, setViewport_BP] = useState({
    latitude: 36.637,
    longitude: 130.22,
    zoom: 6,
  });
  const [viewport_SP, setViewport_SP] = useState({
    latitude: 36.637,
    longitude: 130.22,
    zoom: 5.8,
  });
  const [viewport_TL, setViewport_TL] = useState({
    latitude: 36.637,
    longitude: 130.22,
    zoom: 6,
  });

  const maxBounds = [
    [118.4, 31.9], // 좌측 하단
    [142, 41.1], // 우측 상단
  ];

  const onPrevent = useCallback((e) => {
    console.log(e);
    e.preventDefault();
  }, []);

  return (
    <div className='map-container'>
      <div className='ocean-container' />
      {isBig_PC && (
        <ReactMapGL
          {...viewport_BP}
          mapboxAccessToken={MAP_TOKEN}
          width='100vw'
          height='100vh'
          mapStyle={MAP_STYLE}
          maxBounds={maxBounds}
          onMouseDown={onPrevent}
        >
          {!accessToken ? (
            <LoginMarker />
          ) : (
            <>
              <CustomMarker
                lng={126.606}
                lat={33.344}
                zoom={viewport_BP.zoom}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg'
              />

              <CustomMarker
                lng={128.572}
                lat={36.1}
                zoom={viewport_BP.zoom}
                clicked={true}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/4.jpg'
              />

              <CustomMarker
                lng={128.579}
                lat={37.232}
                zoom={viewport_BP.zoom}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/3-1.jpg'
              />
            </>
          )}
        </ReactMapGL>
      )}
      {isSmall_PC && (
        <ReactMapGL
          {...viewport_BP}
          mapboxAccessToken={MAP_TOKEN}
          mapStyle={MAP_STYLE}
          width={800}
          height={600}
          maxBounds={maxBounds}
          onMouseDown={onPrevent}
        >
          {!accessToken ? (
            <LoginMarker />
          ) : (
            <>
              <CustomMarker
                lng={126.606}
                lat={33.344}
                zoom={viewport_SP.zoom}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg'
              />

              <CustomMarker
                lng={128.572}
                lat={36.1}
                zoom={viewport_SP.zoom}
                clicked={true}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/4.jpg'
              />

              <CustomMarker
                lng={128.579}
                lat={37.232}
                zoom={viewport_SP.zoom}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/3-1.jpg'
              />
            </>
          )}
        </ReactMapGL>
      )}
      {isTablet && (
        <ReactMapGL
          {...viewport_TL}
          mapboxAccessToken={MAP_TOKEN}
          width={500}
          height={300}
          mapStyle={MAP_STYLE}
          maxBounds={maxBounds}
          onMouseDown={onPrevent}
        >
          {!accessToken ? (
            <LoginMarker />
          ) : (
            <>
              <CustomMarker
                lng={126.606}
                lat={33.344}
                zoom={viewport_TL.zoom}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg'
              />

              <CustomMarker
                lng={128.572}
                lat={36.1}
                zoom={viewport_TL.zoom}
                clicked={true}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/4.jpg'
              />

              <CustomMarker
                lng={128.579}
                lat={37.232}
                zoom={viewport_TL.zoom}
                src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/3-1.jpg'
              />
            </>
          )}
        </ReactMapGL>
      )}
    </div>
  );
};

export default Map;
