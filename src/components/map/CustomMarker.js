import { useCallback, useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { load } from '@store/article';

const CustomMarker = ({ postId, lng, lat, imageURl, order }) => {
  const [isClick, setIsClick] = useState(false);

  const { accessToken } = useSelector((state) => state.accessToken);
  const { postId: id } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === postId) setIsClick(true);
    else setIsClick(false);
  }, [postId, id]);

  const onMarkerClick = useCallback(() => {
    dispatch(load({ postId }));
  }, [dispatch, postId]);

  if (order) {
    return (
      <Marker longitude={lng} latitude={lat} anchor='bottom'>
        <div className='map-marker-image order-marker'>
          <img
            src={imageURl}
            alt='marker'
            style={{ cursor: accessToken ? 'pointer' : 'initial' }}
          />
          <span>{order}</span>
        </div>
      </Marker>
    );
  }

  return (
    <Marker
      longitude={lng}
      latitude={lat}
      anchor='bottom'
      onClick={onMarkerClick}
    >
      <div className={`map-marker-image ${isClick ? 'clicked' : ''}`}>
        <img
          src={imageURl}
          alt='marker'
          style={{ cursor: accessToken ? 'pointer' : 'initial' }}
        />
      </div>
    </Marker>
  );
};

export default CustomMarker;
