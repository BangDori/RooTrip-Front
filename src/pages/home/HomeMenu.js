import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Menu from '@constants/menu';
import MyPageIcon from '@assets/menu/mypage.png';
import FriendIcon from '@assets/menu/friend.png';
import TripIcon from '@assets/menu/trip.png';
import RouteIcon from '@assets/menu/route.png';
import LogIcon from '@assets/menu/log.png';
import WriteIcon from '@assets/menu/write.png';
import '@styles/home/nav.scss';

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

const HomeGnb = ({ onClickMenu }) => {
  const menu = useSelector((state) => state.marker.menu);

  return (
    <nav className='side_nav'>
      <div className='menu'>
        <div className='menu_Icon'>
          <Link to='/mypage' style={{ textDecoration: 'none' }}>
            <div className='icon_up'>
              <button type='button'>
                <img
                  src={MyPageIcon}
                  alt='마이페이지'
                  style={{ width: '24px' }}
                />
              </button>
              <span>마이페이지</span>
            </div>
          </Link>
          {menuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              className={`icon_up ${menu === menuItem.id ? 'selected' : ''}`}
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
