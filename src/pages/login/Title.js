import React from 'react';
import Logo from '../../assets/Logo.png'

const Title = () => {
  return (
    <>
    <div className=''>
      <img className='Login_logo' src={Logo} alt="로고사진" />
    </div> 
    <span className='Logotext'>
      <span className='text1'>여행의 재미를 더하는 </span>
      <span className='text2'>SNS</span>
    </span>
    
    </>
  );
};

export default Title;
