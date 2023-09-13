import { Marker } from 'react-map-gl';

const WriteMarkers = ({ markers }) => {
  return (
    <>
      {markers.map((marker) => {
        if (marker.status === 'unspecified') return;
        const { fileName, type, url } = marker;
        const { latitude, longitude } = marker.coordinate;

        return (
          <Marker
            key={fileName}
            longitude={longitude}
            latitude={latitude}
            anchor='bottom'
          >
            <div className='map-marker-image'>
              {type.includes('image/') && (
                <img className='write-marker' src={url} alt='marker' />
              )}
              {type.includes('video/') && (
                <video className='write-marker' src={`${url}#t=0.5`} />
              )}
            </div>
          </Marker>
        );
      })}
    </>
  );
};

export default WriteMarkers;
