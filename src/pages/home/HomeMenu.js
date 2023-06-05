import React from 'react';

import Menu from '@constants/menu';
import FriendIcon from '@assets/menu/friend.png';
import TripIcon from '@assets/menu/trip.png';
import RouteIcon from '@assets/menu/route.png';
import LogIcon from '@assets/menu/log.png';
import WriteIcon from '@assets/menu/write.png';
import '@styles/home/Nav.scss';

const menuItems = [
  { id: Menu.FRIEND, label: '친구 게시글', icon: FriendIcon },
  { id: Menu.TRIP, label: 'Trip', icon: TripIcon },
  { id: Menu.ROUTE, label: 'Route', icon: RouteIcon },
  {
    id: Menu.LOG,
    label: 'Log',
    icon: LogIcon,
    iconWidth: '26px',
  },
  {
    id: Menu.WRITE,
    label: '게시글 작성',
    icon: WriteIcon,
    iconWidth: '28px',
  },
];

const HomeGnb = ({ selectedMenu, onClickMenu }) => {
  return (
    <nav className='side_nav'>
      <div className='menu'>
        <div className='menu_Icon'>
          {menuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              className={`icon_up ${
                selectedMenu === menuItem.id ? 'selected' : ''
              }`}
              onClick={() => onClickMenu(menuItem.id)}
            >
              <button type='button'>
                <img
                  src={menuItem.icon}
                  alt={menuItem.label}
                  style={{ width: menuItem.iconWidth }}
                />
              </button>
              <span>{menuItem.label}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HomeGnb;
