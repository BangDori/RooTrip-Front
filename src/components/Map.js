import React, { useCallback, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const CustomMarker = loadable(() => import('./map/CustomMarker'));
const LoginMarker = loadable(() => import('./map/LoginMarker'));

const MAP_TOKEN = process.env.REACT_APP_MAP_API_TOKEN;
const MAP_STYLE = process.env.REACT_APP_MAP_API_STYLE;

const Map = () => {
  const { accessToken } = useSelector((state) => state.accessToken);
  const [viewport, setViewport] = useState({
    latitude: 36.637,
    longitude: 130.22,
    zoom: 5.7,
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
      <ReactMapGL
        {...viewport}
        width={800}
        height={600}
        mapboxAccessToken={MAP_TOKEN}
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
              zoom={viewport.zoom}
              src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg'
            />

            <CustomMarker
              lng={128.572}
              lat={36.1}
              zoom={viewport.zoom}
              clicked={true}
              src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/4.jpg'
            />

            <CustomMarker
              lng={128.579}
              lat={37.232}
              zoom={viewport.zoom}
              src='https://news.samsungdisplay.com/wp-content/uploads/2018/08/3-1.jpg'
            />
          </>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
