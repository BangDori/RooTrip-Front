import React from 'react';
import Modal_example from '@assets/Modal_example.png';

const WriteChoose = () => {
  return (
    <div className='Second_modal'>
      <div className='Modal_head'>
        <button type='button' className='MoveModal'>
          이전
        </button>
        <span style={{ margin: '0 95px 0 95px' }}>새 게시글 작성하기</span>
        <button type='button' className='MoveModal'>
          다음
        </button>
      </div>
      <div className='Modal_content'>
        <div className='ShowImg_Big'>
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
        </div>
        <div className='ShowImg_Small'>
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <button type='button'>+</button>
        </div>
      </div>
      <div className='footer'>
        <span>7/10</span>
      </div>
    </div>
  );
};

export default WriteChoose;
