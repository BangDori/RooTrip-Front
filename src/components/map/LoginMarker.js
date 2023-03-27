import React from 'react';
import { Marker } from 'react-map-gl';
import LoginMarker1 from '@assets/LoginMarker1.jpg';
import LoginMarker2 from '@assets/LoginMarker2.jpg';
import LoginMarker3 from '@assets/LoginMarker3.jpg';

const Markers = [
  {
    id: 1,
    lng: 126.606,
    lat: 33.244,
    rotate: '280deg',
    src: LoginMarker1,
  },
  {
    id: 2,
    lng: 128.572,
    lat: 36.1,
    rotate: '82deg',
    src: LoginMarker2,
  },
  {
    id: 3,
    lng: 128.579,
    lat: 37.232,
    rotate: '15deg',
    src: LoginMarker3,
  },
];

const LoginMarker = () => {
  return (
    <>
      {Markers.map((marker) => {
        return (
          <Marker
            id={marker.id}
            longitude={marker.lng}
            latitude={marker.lat}
            anchor='bottom'
          >
            <div
              style={{
                transform: `rotate(${marker.rotate})`,
              }}
            >
              <svg
                width='174'
                height='195'
                viewBox='0 0 174 195'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{
                  top: '-170px',
                  left: '17px',
                }}
              >
                <path
                  d='M4.89372 194.124C2.61773 195.521 -0.235684 193.574 0.331282 191.012L41.9368 2.95425C42.397 0.873958 44.876 -0.0896543 46.6514 1.12161L172.064 86.6836C173.84 87.8949 173.76 90.4951 171.912 91.6289L4.89372 194.124Z'
                  fill='#D9D9D9'
                />
              </svg>
              <img
                className='targetImage loginMarker'
                src={marker.src}
                alt={marker.id}
                style={{
                  transformOrigin: 'center',
                  transform: `rotate(-${marker.rotate}) scale(6)`,
                }}
              />
            </div>
          </Marker>
        );
      })}
    </>
  );
};

export default LoginMarker;
