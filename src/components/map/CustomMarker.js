import React, { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import InvertedTriangle from './InvertedTriangle';
import cn from 'classnames';

const CustomMarker = ({ lng, lat, zoom, src, clicked }) => {
  const [isShowMarkers, setIsShowMarkers] = useState(false);

  useEffect(() => {
    if (zoom >= 5.7) {
      if (isShowMarkers) return;

      setIsShowMarkers(true);

      const images = document.querySelectorAll('.targetImage');

      images.forEach((image) => {
        image.classList.add('showMarker');
      });
    } else {
      if (!isShowMarkers) return;

      setIsShowMarkers(false);

      const images = document.querySelectorAll('.targetImage');

      images.forEach((image) => {
        image.classList.remove('showMarker');
      });
    }
  }, [isShowMarkers, zoom]);

  return (
    <Marker longitude={lng} latitude={lat} anchor='bottom'>
      <div className={clicked ? 'bounce' : null}>
        <InvertedTriangle isShow={isShowMarkers} />
        <img
          className={cn('targetImage', 'showMarker', { clickedImage: clicked })}
          src={src}
          alt='1'
        />
      </div>
    </Marker>
  );
};

export default CustomMarker;
