import { Marker } from 'react-map-gl';

const WriteMarker = ({ marker, isAnimation }) => {
  const { fileName, type, url } = marker;
  const { latitude, longitude } = marker.coordinate;

  return (
    <Marker
      key={fileName}
      longitude={longitude}
      latitude={latitude}
      anchor='bottom'
    >
      <div className='map-marker-image write-marker'>
        {type.includes('image/') && <img src={url} alt='marker' />}
        {type.includes('video/') && <video src={`${url}#t=0.5`} />}
      </div>
      {isAnimation && <div className='path-animation' />}
    </Marker>
  );
};

export default WriteMarker;
