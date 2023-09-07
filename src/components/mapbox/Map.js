import { useRef } from 'react';
import { useSelector } from 'react-redux';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  MAP_API_TOKEN,
  MAP_API_STYLE,
  initialViewState,
  ZoomRange,
} from '@config/map-config';
import '@styles/mapbox/Map.scss';

import CustomMarker from './CustomMarker';

const Map = () => {
  const MapGLRef = useRef();
  const { markers, type } = useSelector((state) => state.marker);

  return (
    <div className='map-container'>
      <MapGL
        ref={MapGLRef}
        initialViewState={initialViewState}
        mapStyle={MAP_API_STYLE}
        mapboxAccessToken={MAP_API_TOKEN}
        {...ZoomRange}
      >
        {markers.map((marker) => {
          const { latitude, longitude } = marker.coordinate;

          return (
            <CustomMarker
              key={marker.fileName}
              postId={-1}
              lng={longitude}
              lat={latitude}
              imageURI={marker.url}
              type={type}
            />
          );
        })}
      </MapGL>
      <div className='ocean-container'></div>
    </div>
  );
};

export default Map;
