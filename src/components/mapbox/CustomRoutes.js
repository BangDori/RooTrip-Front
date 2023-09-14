import { Layer, Source } from 'react-map-gl';

const CustomRoutes = ({ routes }) => {
  return (
    <Source id='polylineLayer' type='geojson' data={routes}>
      <Layer
        id='lineLayer'
        type='line'
        source='polylineLayer'
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-color': '#0095f6',
          'line-width': 2,
        }}
      />
    </Source>
  );
};

export default CustomRoutes;
