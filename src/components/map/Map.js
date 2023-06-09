import React, { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useDispatch, useSelector } from 'react-redux';

import { updateLocation } from '@store/location';
import { MAP_API_TOKEN, MAP_API_STYLE } from '@config/service';
import { removeOnStorem, removeAll } from '@store/marker';
import CustomMarker from './CustomMarker';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mapContainer = useRef();
  const map = useRef(null);
  const { accessToken } = useSelector((state) => state.accessToken);
  const { markers } = useSelector((state) => state.marker);
  const { isSetLocation } = useSelector((state) => state.location);
  const dispatch = useDispatch();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isSetLocation && map.current) {
      const handleClick = (e) => {
        const { lat, lng } = e.lngLat;
        dispatch(updateLocation({ lat, lng }));
      };

      map.current.on('click', handleClick);

      return () => {
        map.current.off('click', handleClick);
      };
    }
  }, [dispatch, isSetLocation]);

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

  const removeAllMarkerHandler = useCallback(
    (id) => {
      dispatch(removeAll());
    },
    [dispatch],
  );

  return (
    <div className='map-container'>
      <div className='ocean-container' />
      <button
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          cursor: 'pointer',
          zIndex: '9999',
        }}
        onClick={removeAllMarkerHandler}
      >
        전체 삭제
      </button>
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
                  // onRemove={removeMarkerHandler}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Map;
