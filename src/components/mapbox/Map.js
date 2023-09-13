import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapGL from 'react-map-gl';
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

import CustomMarker from './CustomMarker';
import CustomPopup from './CustomPopup';

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
        {markers.map((marker) => {
          if (marker.status === 'unspecified') return;
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
