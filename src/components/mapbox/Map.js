import { useEffect, useRef, useState } from 'react';
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
import { MAIN_SERVER } from '@config/server-config';
import { loadMarkers } from '@store/marker';
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

  const { polygon, center, zoom } = useSelector((state) => state.map);
  const { accessToken } = useSelector((state) => state.user);
  const { isCustomMode } = useSelector((state) => state.custom);
  const { markers, type } = useSelector((state) => state.marker);
  const { routesIndex, routesSource } = useGetRoutes(markers, MapGLRef);
  const { onZoomEnd, onDragEnd } = useMapState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'TRIP') {
      const getMarkers = async () => {
        if (!accessToken) return;

        const response = await fetch(
          `${MAIN_SERVER}/api/post?polygon=${polygon}&viewType=city`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const resData = await response.json();

        if (!resData.status) {
          return null;
        }

        const { data: files } = resData;
        const recentMarkers = { files };

        dispatch(loadMarkers(recentMarkers));
      };

      getMarkers();
    }
  }, [dispatch, accessToken, polygon, type, center, zoom]);

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
        {(type === 'WRITE' || type === 'ROUTE') && (
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
