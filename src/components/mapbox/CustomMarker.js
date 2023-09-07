import { useState } from 'react';
import { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';

import '@styles/mapbox/Marker.scss';

const CustomMarker = ({ postId, lng, lat, imageURI, type }) => {
  const [isClick, setIsClick] = useState(false);
  const markerPath = isClick ? '/trip' : `/trip/${postId}`;

  switch (type) {
    case 'TRIP':
      return (
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
          <Link to={markerPath}>
            <div className='map-marker-image'>
              <img
                src={imageURI}
                alt='marker'
                className={`${isClick ? 'clicked' : ''}`}
                onClick={() => setIsClick((prev) => !prev)}
              />
            </div>
          </Link>
        </Marker>
      );
    case 'ROUTE':
      return null;
    case 'WRITE':
      return (
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
          <div className='map-marker-image'>
            <img src={imageURI} alt='marker' className='write-marker' />
          </div>
        </Marker>
      );
    default:
      return null;
  }
};

export default CustomMarker;
