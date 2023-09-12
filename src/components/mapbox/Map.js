import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  MAP_API_TOKEN,
  MAP_API_STYLE,
  initialViewState,
  ZoomRange,
} from '@config/map-config';
import { setCoordinateFile } from '@store/custom';
import '@styles/mapbox/Map.scss';

import CustomMarker from './CustomMarker';

const Map = () => {
  const MapGLRef = useRef();

  const { isCustomMode } = useSelector((state) => state.custom);
  const { markers, type } = useSelector((state) => state.marker);
  const dispatch = useDispatch();

  const setLocationFile = (e) => {
    if (!isCustomMode) return;

    // 좌표 삽입
    const { lat, lng } = e.lngLat;
    dispatch(setCoordinateFile({ latitude: lat, longitude: lng }));
  };

  return (
    <div className='map-container'>
      <MapGL
        ref={MapGLRef}
        initialViewState={initialViewState}
        mapStyle={MAP_API_STYLE}
        mapboxAccessToken={MAP_API_TOKEN}
        onClick={setLocationFile}
        dragRotate={false}
        {...ZoomRange}
      >
        {markers.map((marker) => {
          if (marker.status === 'unspecified') return null;
          const { latitude, longitude } = marker.coordinate;

          return (
            <CustomMarker
              key={marker.fileName}
              postId={-1}
              lng={longitude}
              lat={latitude}
              imageURI={marker.url}
              markerType={marker.type}
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
