import React from 'react';
import LogoImage from '@assets/rooTrip/logo.png';
import styled from 'styled-components';

const StyledLogo = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;

  z-index: 15;
  width: 200px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const HomeLogo = () => {
  return (
    <StyledLogo className='Title'>
      <img src={LogoImage} alt='루트트립 로고' className='Logo' />
    </StyledLogo>
  );
};

export default HomeLogo;
