import WriteMarker from './WriteMarker';

const WriteMarkers = ({ markers, routesIndex }) => (
  <>
    {markers.map((marker, idx) => {
      if (marker.status === 'unspecified') return;

      const start = routesIndex[0] === idx;
      const end = routesIndex.at(-1) === idx;

      return (
        <WriteMarker
          key={marker.fileName}
          marker={marker}
          isAnimation={start || end}
        />
      );
    })}
  </>
);

export default WriteMarkers;
