import { useRef } from 'react';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  MAP_API_TOKEN,
  MAP_API_STYLE,
  initialViewState,
  ZoomRange,
} from '@config/map-config';
import '@styles/Map.scss';

const Map = () => {
  const MapGLRef = useRef();

  return (
    <div className='map-container'>
      <MapGL
        ref={MapGLRef}
        initialViewState={initialViewState}
        mapStyle={MAP_API_STYLE}
        mapboxAccessToken={MAP_API_TOKEN}
        {...ZoomRange}
      ></MapGL>
      <div className='ocean-container'></div>
    </div>
  );
};

export default Map;
