import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPlaneUp,
  // faMapLocationDot,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';

import logoIcon from '@assets/logo-icon.png';
import '@styles/GNB.scss';

const GNB = () => {
  return (
    <div className='gnb'>
      <NavLink to='/trip'>
        <img src={logoIcon} className='logo-icon' alt='logo image' />
      </NavLink>

      <ul className='menu'>
        <li>
          <NavLink
            to='/profile/3'
            className={({ isActive }) => (isActive ? 'isActive' : undefined)}
          >
            <div className='menu-icon'>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/trip'
            className={({ isActive }) => (isActive ? 'isActive' : undefined)}
          >
            <div className='menu-icon'>
              <FontAwesomeIcon icon={faPlaneUp} />
            </div>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to='/route'
            className={({ isActive }) => (isActive ? 'isActive' : undefined)}
          >
            <div className='menu-icon'>
              <FontAwesomeIcon icon={faMapLocationDot} />
            </div>
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to='/write'
            className={({ isActive }) => (isActive ? 'isActive' : undefined)}
          >
            <div className='menu-icon'>
              <FontAwesomeIcon icon={faCamera} />
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default GNB;
