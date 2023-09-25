import { Popup } from 'react-map-gl';

import blueMarkerIcon from '@assets/blue-marker-icon.png';
import '@styles/mapbox/Popup.scss';

const CustomPopup = ({ info, onClose, setLocation }) => {
  const { lng, lat, address } = info;

  return (
    <Popup longitude={lng} latitude={lat} anchor='bottom' onClose={onClose}>
      <div className='title'>
        <img src={blueMarkerIcon} alt='blue marker icon' />
        <p className='message'>선택한 장소가 맞나요?</p>
      </div>
      <div className='content'>
        <p>
          <strong className='address'>{address}</strong>
        </p>
        <button className='check-button' onClick={setLocation}>
          확인
        </button>
      </div>
    </Popup>
  );
};

export default CustomPopup;
