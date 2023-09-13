import { Marker } from 'react-map-gl';

const WriteMarkers = ({ markers }) => {
  const routes = markers
    .map((marker, idx) => (marker.status === 'specified' ? idx : -1))
    .filter((idx) => idx !== -1);

  return (
    <>
      {markers.map((marker, idx) => {
        if (marker.status === 'unspecified') return;
        const { fileName, type, url } = marker;
        const { latitude, longitude } = marker.coordinate;

        // eslint-disable-next-line no-console
        console.log(idx, routes);

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
