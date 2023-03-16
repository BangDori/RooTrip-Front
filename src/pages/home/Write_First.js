import React from 'react';
import camera from '@assets/camera.png';
const Write_First = () => {
  return (
    <div className='First_modal'>
      <div className='Modal_head'>
        <span>새 게시글 작성하기</span>
      </div>
      <div className='Modal_First_content'>
        <div className='Photo_logo'>
          <img src={camera} alt='카메라 사진' />
        </div>
        <div className='ChoosePhoto'>
          <button type='button'>사진을 선택해주세요</button>
        </div>
      </div>
    </div>
  );
};

export default Write_First;
