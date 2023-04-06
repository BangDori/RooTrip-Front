import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useSelector } from 'react-redux';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGetImages } from '@hooks/useGetImages';
import { MAP_API_TOKEN, MAP_API_STYLE } from '@config/service';
import useMapEvents from '@hooks/useMapEvents';
import CustomMarker from './map/CustomMarker';

const Map = () => {
  const mapContainer = useRef();
  const map = useRef();
  const { accessToken } = useSelector((state) => state.accessToken);

  // get image for custom marker
  const imageData = useGetImages(!!accessToken);

  // map event initialize
  const { onMapLoad, onMapUnload } = useMapEvents({ map });

  // map initialize
  useEffect(() => {
    if (map.current) return; // 맵이 생성되어 있다면,

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      accessToken: MAP_API_TOKEN,
      style: MAP_API_STYLE,
      center: [131.1, 36.4395],
      zoom: 5.5,
      minZoom: 5.5,
      maxZoom: 10,
      antialias: false,
      doubleClickZoom: false,
      dragRotate: false,
      interactive: !!accessToken, // accessToken ? Interactive : NULL
    });

    return () => {
      map.current.remove();
    };
  }, [accessToken]);

  // event loading
  useEffect(() => {
    if (map) {
      accessToken
        ? map.current.on('load', onMapLoad)
        : map.current.on('load', onMapUnload);

      return () => {
        accessToken
          ? map.current.off('load', onMapLoad)
          : map.current.off('load', onMapUnload);
      };
    }
  }, [map, accessToken, onMapLoad, onMapUnload]);

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
            accessToken={accessToken}
          />
        ))}
      </div>
    </div>
  );
};

export default Map;
