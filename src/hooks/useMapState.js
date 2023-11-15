import { useDispatch } from 'react-redux';

import { changeMap } from '@store/map';
import { getPolygonBoundary } from '@utils/map';

const useMapState = () => {
  const dispatch = useDispatch();

  const onMoveMap = async (e) => {
    const currentZoom = e.target.getZoom();
    const bounds = e.target.getBounds();

    const { _sw: x, _ne: y } = bounds;
    const { lng: lng1, lat: lat1 } = x;
    const { lng: lng2, lat: lat2 } = y;

    const polygon = getPolygonBoundary(lng1, lat1, lng2, lat2);
    const center = [(lng1 + lng2) / 2, (lat1 + lat2) / 2];

    const changeForm = {
      center,
      polygon,
      zoom: currentZoom,
    };

    dispatch(changeMap(changeForm));
  };

  const onZoomEnd = (e) => {
    onMoveMap(e);
  };

  const onDragEnd = (e) => {
    const currentZoom = e.target.getZoom();
    if (currentZoom < 7) return;

    onMoveMap(e);
  };

  return { onZoomEnd, onDragEnd };
};

export default useMapState;
