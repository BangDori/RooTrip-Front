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

      <Layer
        id='arrowLayer'
        type='symbol'
        source='polylineLayer'
        layout={{
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'icon-image': 'arrow1',
          'icon-size': 0.75,
        }}
        paint={{ 'icon-color': '#0095f6' }}
      />
    </Source>
  );
};

export default CustomRoutes;
