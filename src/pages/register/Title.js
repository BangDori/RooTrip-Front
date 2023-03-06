import React from 'react';
import '../../styles/register/register.scss'
import Logo from '../../assets/Logo.png'
const Title = () => {
    return (
        <div className='Register_Title'>
            <img className='logo' src={Logo} alt="로고사진" />
            <span className='content'>JOIN MEMBERS</span>
        </div>
    );
};

export default Title;