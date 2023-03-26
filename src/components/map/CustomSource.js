import React from 'react';
import { Layer, Source } from 'react-map-gl';
import Korea from '@jsons/korea.json';

const CustomSource = () => {
  const fillStyle = {
    id: 'korea-layer',
    type: 'fill',
    paint: {
      'fill-color': '#5F615E',
      'fill-opacity': 1,
    },
  };

  const provinceStyle = {
    id: 'province-layer',
    type: 'line',
    source: 'korea',
    paint: {
      'line-color': '#cccccc',
      'line-width': 1,
    },
    filter: ['==', '$type', 'Polygon'],
  };

  return (
    <Source id='korea' type='geojson' data={Korea}>
      <Layer {...fillStyle} />
      <Layer {...provinceStyle} />
    </Source>
  );
};

export default CustomSource;
