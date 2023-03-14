import React, { useState } from 'react';
import Title from './Title';
import '../../styles/register/register.scss';
import GoogleLogo from '../../assets/googleLogo.png';

const CertificationEmail = () => {
  const [send, setSend] = useState('false');

  return (
    <div>
      <Title />
      <div className='Register_main'>
        <div className='Certification_email_title'>
          <h1 className='certification_email_title_text'>이메일 인증</h1>
          <img className='Goo_logo' src={GoogleLogo} alt='구글 로고' />
        </div>
        <div className='User_data_crt'>
          <div className='User_data_name'>
            <span>이메일 주소</span>
            <span>인증 번호</span>
          </div>
          <div className='User_data_content'>
            <div>
              <input
                type='text'
                name='email'
                value=''
                placeholder='example@example.com'
              />
              {send === 'false' ? (
                <button type='button' className='Sign_certification_btn'>
                  인증하기
                </button>
              ) : (
                <button type='button' className='Resign_certification_btn'>
                  재발급
                </button>
              )}
            </div>
            <div>
              <input
                className='certification_Num'
                type='text'
                name='certification_Num'
                value=''
                placeholder='인증 번호 6자리'
              />
              <span className='Certi_email_checktext'>
                ※ 틀렸습니다. 재발신 해주세요
              </span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button className='Com_certification_btn' type='button'>
            인증하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationEmail;
