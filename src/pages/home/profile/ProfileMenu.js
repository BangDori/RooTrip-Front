import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '@services/user';
import { remove } from '@store/accessToken';

const StyledProfileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  svg {
    position: relative;
    right: 5px;
  }
  .menu {
    display: flex;
    flex-direction: column;

    border-radius: 5px;
    background-color: #ebebeb;

    text-align: center;

    button {
      border: none;
      background-color: none;
      padding: 8px 12px;
      opacity: ${(props) => (props.isActive ? '1' : '0')};
      transition: opacity 0.5s ease-in-out;
    }

    button:first-child {
      border-bottom: 1px solid #b8b8b8;
    }
  }
`;

const ProfileMenu = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(async () => {
    try {
      await logout();
      dispatch(remove());
    } catch (e) {
      // error
    }
  }, [dispatch]);

  return (
    <StyledProfileMenu isActive={true}>
      <svg
        width='23'
        height='20'
        viewBox='0 0 23 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11.4622 0.128893L22.4612 19.9755L0.876083 20.1988L11.4622 0.128893Z'
          fill='#EBEBEB'
        />
      </svg>
      <div className='menu'>
        <Link to='/mypage'>
          <button>마이페이지</button>
        </Link>
        <Link to='/'>
          <button onClick={onLogout}>로그아웃</button>
        </Link>
      </div>
    </StyledProfileMenu>
  );
};

export default ProfileMenu;
