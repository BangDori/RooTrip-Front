import TripMarker from './TripMarker';

const TripMarkers = ({ markers }) => {
  return (
    <>
      {markers.map((marker) => {
        if (marker.status === 'unspecified') return;

        return <TripMarker key={marker.postId} marker={marker} />;
      })}
    </>
  );
};

export default TripMarkers;
