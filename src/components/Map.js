import React, { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGetImages } from '../hooks/useGetImages';

const CustomMarker = loadable(() => import('./map/CustomMarker'));

const MAP_TOKEN = process.env.REACT_APP_MAP_API_TOKEN;
const MAP_STYLE = process.env.REACT_APP_MAP_API_STYLE;

const Map = () => {
  const mapContainer = useRef();
  const map = useRef();
  const { accessToken } = useSelector((state) => state.accessToken);
  const [viewport, setViewport] = useState({
    lat: 36.4395,
    lng: 131.1,
    zoom: 5.5,
  });
  const imageData = useGetImages(accessToken ? true : false);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      accessToken: MAP_TOKEN,
      style: MAP_STYLE,
      center: [viewport.lng, viewport.lat],
      zoom: viewport.zoom,
      minZoom: 5.5,
      maxZoom: 10,
      antialias: false,
      interactive: !accessToken ? false : true, //드래그 & 줌 둘다 막힘
    });
  }, [accessToken, viewport]);

  const onMarkerClick = useCallback(() => {
    console.log('click');
  }, []);

  return (
    <div className='map-container'>
      <div className='ocean-container' />
      <div ref={mapContainer} className='map-container'>
        {imageData.map((data, index) => (
          <CustomMarker
            key={index}
            map={map.current}
            src={data.src}
            metadata={data.metadata}
            onMarkerClick={accessToken ? onMarkerClick : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Map;
