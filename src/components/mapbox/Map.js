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
import useMapState from '@hooks/useMapState';
import useGetRoutes from '@hooks/useGetRoutes';
import { getReverseAddress } from '@services/photo';
import { setCoordinateFile } from '@store/custom';
import '@styles/mapbox/Map.scss';
import '@styles/mapbox/Marker.scss';

import CustomPopup from './CustomPopup';
import TripMarkers from './TripMarkers';
import WriteMarkers from './WriteMarkers';
import CustomRoutes from './CustomRoutes';

const Map = () => {
  const MapGLRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});

  const { isCustomMode } = useSelector((state) => state.custom);
  const { markers, type } = useSelector((state) => state.marker);
  const { routesIndex, routesSource } = useGetRoutes(markers, MapGLRef);
  const { onZoomEnd, onDragEnd } = useMapState();
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
        onZoomEnd={onZoomEnd}
        onDragEnd={onDragEnd}
        {...ZoomRange}
      >
        {type === 'TRIP' && <TripMarkers markers={markers} />}
        {type === 'WRITE' && (
          <>
            <WriteMarkers markers={markers} routesIndex={routesIndex} />
            <CustomRoutes routes={routesSource} />
          </>
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
