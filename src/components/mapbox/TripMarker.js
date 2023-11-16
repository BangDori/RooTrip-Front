import { Marker } from 'react-map-gl';
import { NavLink } from 'react-router-dom';

const TripMarker = ({ marker }) => {
  const { postId, type, imageUrl, coordinate, fileName } = marker;
  const { latitude, longitude } = coordinate;

  return (
    <Marker
      key={postId}
      longitude={longitude}
      latitude={latitude}
      anchor='bottom'
    >
      <NavLink
        to={`/trip/${postId}`}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <div className='map-marker-image trip-marker'>
          {type.includes('image/') && <img src={imageUrl} alt={fileName} />}
          {type.includes('video/') && <video src={`${imageUrl}#t=0.5`} />}
        </div>
      </NavLink>
    </Marker>
  );
};

export default TripMarker;
