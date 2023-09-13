import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  MAP_API_TOKEN,
  MAP_API_STYLE,
  initialViewState,
  ZoomRange,
} from '@config/map-config';
import { getReverseAddress } from '@services/photo';
import { setCoordinateFile } from '@store/custom';
import '@styles/mapbox/Map.scss';
import '@styles/mapbox/Marker.scss';

import CustomPopup from './CustomPopup';
import TripMarkers from './TripMarkers';
import WriteMarkers from './WriteMarkers';

const Map = () => {
  const MapGLRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});

  const { isCustomMode } = useSelector((state) => state.custom);
  const { markers, type } = useSelector((state) => state.marker);
  const dispatch = useDispatch();

  const onShowPopup = async (e) => {
    if (!isCustomMode) return;
    const { lat, lng } = e.lngLat;

    const address = await getReverseAddress(lat, lng);
    setShowPopup(true);
    setPopupInfo({ lat, lng, address });
  };

  const setLocationFile = () => {
    const { lat, lng } = popupInfo;

    dispatch(setCoordinateFile({ latitude: lat, longitude: lng }));
    setShowPopup(false);
  };

  const routesMarker = markers
    .filter((marker) => marker.status !== 'unspecified')
    .map((marker) => {
      const { latitude, longitude } = marker.coordinate;
      return [longitude, latitude];
    });

  // 경로 표시
  const routes = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [...routesMarker],
    },
  };

  return (
    <div className='map-container'>
      <MapGL
        ref={MapGLRef}
        initialViewState={initialViewState}
        mapStyle={MAP_API_STYLE}
        mapboxAccessToken={MAP_API_TOKEN}
        onClick={onShowPopup}
        dragRotate={false}
        {...ZoomRange}
      >
        {type === 'TRIP' && <TripMarkers markers={markers} />}
        {type === 'WRITE' && <WriteMarkers markers={markers} />}
        {type === 'WRITE' && (
          <Source id='polylineLayer' type='geojson' data={routes}>
            <Layer
              id='lineLayer'
              type='line'
              source='my-data'
              layout={{
                'line-join': 'round',
                'line-cap': 'round',
              }}
              paint={{
                'line-color': '#0095f6',
                'line-width': 4,
                'line-dasharray': [0, 3, 3],
              }}
            />
          </Source>
        )}
        {showPopup && (
          <CustomPopup
            info={popupInfo}
            onClose={() => setShowPopup(false)}
            setLocation={setLocationFile}
          />
        )}
      </MapGL>
      <div className='ocean-container'></div>
    </div>
  );
};

export default Map;
