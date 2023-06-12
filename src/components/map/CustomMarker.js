import { useCallback, useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { load } from '@store/article';
import Menu from '@constants/menu';

const CustomMarker = ({ postId, lng, lat, imageURl, order }) => {
  const [isClick, setIsClick] = useState(false);

  const { accessToken } = useSelector((state) => state.accessToken);
  const menu = useSelector((state) => state.marker.menu);
  const { postId: id } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === postId) setIsClick(true);
    else setIsClick(false);
  }, [postId, id]);

  const onMarkerClick = useCallback(() => {
    dispatch(load({ postId }));
  }, [dispatch, postId]);

  return (
    <Marker
      longitude={lng}
      latitude={lat}
      anchor='bottom'
      onClick={onMarkerClick}
    >
      <div
        className={`map-marker-image ${
          isClick && menu === Menu.TRIP ? 'clicked' : ''
        } ${menu !== Menu.TRIP ? 'no-effect-marker' : ''}`}
      >
        <img
          src={imageURl}
          alt='marker'
          style={{ cursor: menu === Menu.TRIP ? 'pointer' : 'initial' }}
        />
        {order && <span>{order}</span>}
      </div>
    </Marker>
  );
};

export default CustomMarker;
