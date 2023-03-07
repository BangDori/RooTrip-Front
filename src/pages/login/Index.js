import LoginContainer from './LoginContainer';
import SocialLogin from './SocialLogin';
import Title from './Title';
import '../../styles/login/login.scss';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1Ijoic2lpOTA1OSIsImEiOiJjbGV2YnpsOWwwMTg1M3FxdzFlYXQwdGVzIn0.A7tzU3g39ILq54rHm_YEtA';

const Index = () => {
  const mapContainer = useRef();
  const map = useRef();
  const [lng, setLng] = useState(130);
  const [lat, setLat] = useState(36.2);
  const [zoom, setZoom] = useState(5.99);
  const geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'message': 'Foo',
          'iconSize': [60, 60]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [lng, lat]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Bar',
          'iconSize': [50, 50]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [lng+1, lat+1]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Baz',
          'iconSize': [40, 40]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [lng-1, lat-1]
        }
      }
    ]
  };

  useEffect(() => {
      if (map.current) return; // initialize map only once

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/sii9059/clexxn7kx001x01qabjv38r8f',
        center: [lng, lat],
        zoom: zoom,
        // pitch: 45,
        // bearing: -17.6,
        antialias: false
      });

      map.current.on('load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
          (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;
         
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer({
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 8,
          'paint': {
            'fill-extrusion-color': '#aaa',
            
            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        }, labelLayerId);
      });

      for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
         
        el.addEventListener('click', () => {
          window.alert(marker.properties.message);
        });
         
        // Add markers to the map.
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);
      }
  });
  
  
  return (
    <div ref={mapContainer} onClick={function(e){
      console.log(e.target);
    }}className="map-container">
      
      <div className='LoginPage'>
        <Title />
        <LoginContainer />
        <SocialLogin />
      </div>
    </div>
  );
};

export default Index;