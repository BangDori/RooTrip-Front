import { Marker } from 'react-map-gl';

const WriteMarker = ({ marker, isAnimation }) => {
  const { fileName, type, url, imageUrl } = marker;
  const { latitude, longitude } = marker.coordinate;

  const fileURL = !url ? imageUrl : url;

  return (
    <Marker
      key={fileName}
      longitude={longitude}
      latitude={latitude}
      anchor='bottom'
    >
      <div className='map-marker-image write-marker'>
        {type.includes('image/') && <img src={fileURL} alt='marker' />}
        {type.includes('video/') && <video src={`${fileURL}#t=0.5`} />}
      </div>
      {isAnimation && <div className='path-animation' />}
    </Marker>
  );
};

export default WriteMarker;
