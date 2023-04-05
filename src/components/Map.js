import React, { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import '@styles/components/Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGetImages } from '@hooks/useGetImages';
import { MAP_API_TOKEN, MAP_API_STYLE } from '@config/service';

const CustomMarker = loadable(() => import('./map/CustomMarker'));

const Map = () => {
  const mapContainer = useRef();
  const map = useRef();
  const hoveredStateId = useRef(null);
  const { accessToken } = useSelector((state) => state.accessToken);
  const imageData = useGetImages(accessToken ? true : false);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      accessToken: MAP_API_TOKEN,
      style: MAP_API_STYLE,
      center: [131.1, 36.4395],
      zoom: 5.5,
      minZoom: 5.5,
      maxZoom: 10,
      antialias: false,
      doubleClickZoom: false,
      dragRotate: false,
      // interactive: !accessToken ? false : true, //드래그 & 줌 둘다 막힘
    });

    if (accessToken) {
      map.current.on('load', onLoad);
    } else {
      map.current.setPaintProperty('korea-fill', 'fill-opacity', 1);
    }

    return () => {
      map.current.off('load', onLoad);
      map.current.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMapClick = useCallback(
    (e) => {
      const zoom = map.current.getZoom();
      const { lngLat } = e;

      map.current.flyTo({
        essential: true,
        center: lngLat,
        zoom: zoom + 1,
        speed: 1.25,
        easing: (t) => t,
      });
    },
    [map],
  );

  const onMapMove = useCallback((e) => {
    map.current.getCanvas().style.cursor = 'pointer';

    const { sourceLayer, id } = e.features[0];
    console.log(sourceLayer);
    map.current.setFeatureState(
      {
        source: 'composite',
        sourceLayer: sourceLayer,
        id: id,
      },
      { hover: true },
    );

    if (hoveredStateId.current !== id) {
      map.current.setFeatureState(
        {
          source: 'composite',
          sourceLayer: sourceLayer,
          id: hoveredStateId.current,
        },
        { hover: false },
      );
    }

    hoveredStateId.current = id;
  }, []);

  const onMapLeave = useCallback(() => {
    map.current.getCanvas().style.cursor = 'initial';

    if (hoveredStateId.current !== null) {
      map.current.setFeatureState(
        {
          source: 'composite',
          sourceLayer: 'Korea_Level1-72rlhs',
          id: hoveredStateId.current,
        },
        { hover: false },
      );
    }
  }, []);

  const onLoad = useCallback(() => {
    map.current.on('click', 'korea-fill', onMapClick);
    map.current.on('mousemove', 'korea-fill', onMapMove);
    map.current.on('mouseleave', 'korea-fill', onMapLeave);

    return () => {
      map.current.off('mousemove', 'korea-fill', onMapMove);
      map.current.off('mouseleave', 'korea-fill', onMapLeave);
      map.current.off('click', 'korea-fill', onMapClick);
    };
  }, [onMapClick, onMapMove, onMapLeave]);

  return (
    <div className='map-container'>
      <div className='ocean-container' />
      <div ref={mapContainer} className='map-container'>
        {imageData.map((data, index) => (
          <CustomMarker
            key={index}
            map={map.current}
            src={data.src}
            metadata={data.metadata}
            accessToken={accessToken}
          />
        ))}
      </div>
    </div>
  );
};

export default Map;
