import { useState } from 'react';
import { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';

const TripMarker = ({ marker }) => {
  const [clickedPostId, setClickedPostId] = useState(marker.postId);

  const { postId, type, imageUrl, coordinate, fileName } = marker;
  const { latitude, longitude } = coordinate;

  const markerPath = `/trip/${clickedPostId}`;

  const onClickPost = () => {
    if (clickedPostId === postId) setClickedPostId('');
    else setClickedPostId(postId);
  };

  return (
    <Marker
      key={postId}
      longitude={longitude}
      latitude={latitude}
      anchor='bottom'
    >
      <Link to={markerPath}>
        <div className='map-marker-image'>
          {type.includes('image/') && (
            <img
              src={imageUrl}
              alt={fileName}
              className={`${clickedPostId === postId ? 'clicked' : ''}`}
              onClick={onClickPost}
            />
          )}
          {type.includes('video/') && (
            <video
              src={`${imageUrl}#t=0.5`}
              className={`${clickedPostId === postId ? 'clicked' : ''}`}
              onClick={onClickPost}
            />
          )}
        </div>
      </Link>
    </Marker>
  );
};

export default TripMarker;
