import React from 'react';
import ProfileTest from '@assets/naver.png';

const Modify = () => {
  return (
    <>
      <div className='modifyBox'>
        <div className='modifyProfile'>
          <div className='modifyTitle'>
            <img src={ProfileTest} alt='Test' />
          </div>
          <div className='modifyContent'>
            <div>
              <span>닉네임</span>
              <input type='text' name='' className='inputNickName' />
              <button type='button'>변경</button>
            </div>
            <div className='changeProfile'>
              <span>프로필 사진 변경</span>
            </div>
          </div>
        </div>
        <div className='modifyIntroduction'>
          <div className='modifyTitle'>
            <span>소개글</span>
          </div>
          <div className='modifyContent'>
            <textarea rows='8' cols='50'></textarea>
          </div>
        </div>
        <div className='modifySex'>
          <div className='modifyTitle'>
            <span>성별</span>
          </div>
          <div className='modifyContent'>
            <input type='radio' name='check' value='MAN' className='radioBtn' />
            <label>남자</label>
            <input
              type='radio'
              name='check'
              value='WOMAN'
              className='radioBtn'
            />
            <label>여자</label>
            <input type='radio' name='check' value='ETC' className='radioBtn' />
            <label>기타</label>
            <input type='text' name='ETC_Input' className='etcInput' />
          </div>
        </div>
        <div className='modifyPw'>
          <div className='modifyTitle'>
            <span>비밀번호 변경</span>
          </div>
          <div className='modifyContent'>
            <input type='text' name='nowPw' placeholder='현재 비밀번호' />
            <input
              type='text'
              name='newPw'
              placeholder='새로운 비밀번호'
              style={{ marginTop: '15px' }}
            />
            <div style={{ marginTop: '15px' }}>
              <input
                type='text'
                name='newPwCheck'
                placeholder='새로운 비밀번호 검사'
              />
              <button type='button' style={{ marginLeft: '20px' }}>
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modify;
