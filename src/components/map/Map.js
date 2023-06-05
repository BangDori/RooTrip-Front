import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useSelector } from 'react-redux';

import { MAP_API_TOKEN, MAP_API_STYLE } from '@config/service';
import CustomMarker from './CustomMarker';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mapContainer = useRef();
  const map = useRef(null);
  const { accessToken } = useSelector((state) => state.accessToken);
  const markers = useSelector((state) => state.marker);

  // map event initialize
  const bounds = [
    [130.8, 36.1395], // Southwest coordinates
    [131.6, 36.8395], // Northeast coordinates
  ];
  // map initialize
  useEffect(() => {
    setIsLoading(true);

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

    map.current.on('load', () => setIsLoading(false));
  }, [accessToken]);

  return (
    <div className='map-container'>
      <div className='ocean-container' />
      <div ref={mapContainer} className='map-container'>
        {markers && map.current
          ? markers.map((marker) => {
              if (!marker.coordinate) return null;

              const coordinateString = marker.coordinate
                .replace('POINT(', '')
                .replace(')', '');
              const [lng, lat] = coordinateString.split(' ');

              return (
                <CustomMarker
                  key={marker.id}
                  id={marker.postId}
                  map={map.current}
                  src={marker.imageUrl}
                  coordinate={[lat, lng]}
                  accessToken={accessToken}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Map;
