import React, { useCallback, useState } from 'react';
import Profile from '@assets/태훈이 프사.jpg';
import styled from 'styled-components';
import ProfileMenu from './profile/ProfileMenu';

const StyledProfile = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  text-align: right;
  z-index: 101;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;

    cursor: pointer;
  }

  .profile-menu {
    overflow: hidden;
    height: ${(props) => (props.isActive ? '100px' : '0')};
    transition: height 0.5s ease-in-out;
  }
s`;

const HomeProfile = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = useCallback(() => {
    setIsActive((prevIsActive) => !prevIsActive);
  }, []);

  return (
    <StyledProfile isActive={isActive}>
      <img src={Profile} alt='profile_image' onClick={handleClick} />
      <div className='profile-menu'>{isActive && <ProfileMenu />}</div>
    </StyledProfile>
  );
};

export default HomeProfile;
