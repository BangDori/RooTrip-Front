import React, { useCallback, useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import CustomMarker from './map/CustomMarker';
import CustomSource from './map/CustomSource';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAP_TOKEN = process.env.REACT_APP_MAP_API_TOKEN;
const MAP_STYLE = process.env.REACT_APP_MAP_API_STYLE;

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 36.637,
    longitude: 130.22,
    zoom: 6.1,
  });

  const onPrevent = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={MAP_TOKEN}
        mapStyle={MAP_STYLE}
        onMouseDown={onPrevent}
      >
        <CustomSource />

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
      </ReactMapGL>
    </>
  );
};

export default Map;
