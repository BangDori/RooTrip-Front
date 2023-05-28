import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useSelector } from 'react-redux';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import useGetImages from '@hooks/useGetImages';
import { MAP_API_TOKEN, MAP_API_STYLE } from '@config/service';
import useMapEvents from '@hooks/useMapEvents';
import CustomMarker from './CustomMarker';

const Map = ({ markers }) => {
  const mapContainer = useRef();
  const map = useRef(null);
  const { accessToken } = useSelector((state) => state.accessToken);
  const [isLoading, setIsLoading] = useState(false);

  // // get image for custom marker
  // const imageData = useGetImages(!!accessToken);

  // map event initialize
  const { onMapLoad, onMapUnload } = useMapEvents({ map });
  const bounds = [
    // Southwest coordinates
    [130.8, 36.1395],
    [131.6, 36.8395], // Northeast coordinates
  ];
  // map initialize
  useEffect(() => {
    setIsLoading(false);

    if (!map.current) {
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
        maxBounds: [
          [112.704171, 32.745446],
          [145.046554, 41.038954],
        ],
      });
    }

    map.current.on('load', () => setIsLoading(true));
  }, [accessToken]);

  // event loading
  useEffect(() => {
    if (map.current) {
      if (accessToken) map.current.on('load', onMapLoad);
      else map.current.on('load', onMapUnload);

      return () => {
        if (accessToken) map.current.off('load', onMapLoad);
        else map.current.off('load', onMapUnload);
      };
    }

    return null;
  }, [map, accessToken, onMapLoad, onMapUnload]);

  return (
    <div className='map-container'>
      <div className='ocean-container' />
      <div ref={mapContainer} className='map-container'>
        {isLoading &&
          accessToken &&
          markers.length > 0 &&
          markers.map((marker) => {
            if (!marker.coordinate) return null;

            const coordinateString = marker.coordinate
              .replace('POINT(', '')
              .replace(')', '');

            const [lng, lat] = coordinateString.split(' ');

            return (
              <CustomMarker
                key={marker.id}
                map={map.current}
                src={marker.imageUrl}
                coordinate={[lat, lng]}
                accessToken={accessToken}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Map;
