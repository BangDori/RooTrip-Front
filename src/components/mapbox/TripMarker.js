import { useState } from 'react';
import { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';

const TripMarker = ({ marker }) => {
  const { postId, type, imageUrl, coordinate, fileName } = marker;
  const { latitude, longitude } = coordinate;

  const [clickedPostId, setClickedPostId] = useState('');
  const markerPath = `/trip/${postId === clickedPostId ? '' : postId}`;

  const onClickPost = () => {
    if (clickedPostId === postId) setClickedPostId('');
    else setClickedPostId(postId);
  };

  const markerClass = `map-marker-image trip-marker ${
    clickedPostId === postId ? 'clicked' : ''
  }`;

  return (
    <Marker
      key={postId}
      longitude={longitude}
      latitude={latitude}
      anchor='bottom'
    >
      <Link to={markerPath}>
        <div className={markerClass}>
          {type.includes('image/') && (
            <img src={imageUrl} alt={fileName} onClick={onClickPost} />
          )}
          {type.includes('video/') && (
            <video src={`${imageUrl}#t=0.5`} onClick={onClickPost} />
          )}
        </div>
      </Link>
    </Marker>
  );
};

export default TripMarker;
