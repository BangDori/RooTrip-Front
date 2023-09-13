import { useState } from 'react';
import { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';

const TripMarkers = ({ markers }) => {
  const [clickedPostId, setClickedPostId] = useState('');
  const markerPath = `/trip/${clickedPostId}`;

  return (
    <>
      {markers.map((marker) => {
        if (marker.status === 'unspecified') return;
        const { postId, type, url } = marker;
        const { latitude, longitude } = marker.coordinate;

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
                    src={url}
                    alt='marker'
                    className={`${clickedPostId === postId ? 'clicked' : ''}`}
                    onClick={onClickPost}
                  />
                )}
                {type.includes('video/') && (
                  <video
                    src={`${url}#t=0.5`}
                    className={`${clickedPostId === postId ? 'clicked' : ''}`}
                    onClick={onClickPost}
                  />
                )}
              </div>
            </Link>
          </Marker>
        );
      })}
    </>
  );
};

export default TripMarkers;
