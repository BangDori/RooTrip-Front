import React from 'react';
import Modal_example from '@assets/Modal_example.png';
import { useState } from 'react';
import NotChoose from '@components/Write/NotChoose';
import Choose from '@components/Write/Choose';

const SelectImages = ({ photos, setPhotos, onPrevPage, onNextPage }) => {
  const [choose, setChoose] = useState(0);

  return (
    <div className='Second_modal'>
      <div className='Modal_head'>
        <button
          type='button'
          className='MoveModal F'
          onClick={() => onPrevPage()}
        >
          이전
        </button>
        <span style={{ margin: '0 95px 0 95px' }}>새 게시글 작성하기</span>
        <button
          type='button'
          className='MoveModal Co'
          onClick={() => onNextPage()}
        >
          다음
        </button>
      </div>
      <div className='Modal_content'>
        {/* 사진이 한장이라도 선택되면 Choose 컴포넌트 */}
        {choose === 0 ? <NotChoose /> : <Choose />}
        <div className='ShowImg_Big'>
          <img
            src={Modal_example}
            onClick={() => setChoose(choose + 1)}
            alt=''
          />
          <img
            src={Modal_example}
            onClick={() => setChoose(choose + 1)}
            alt=''
          />
          <img
            src={Modal_example}
            onClick={() => setChoose(choose + 1)}
            alt=''
          />
          <img
            src={Modal_example}
            onClick={() => setChoose(choose + 1)}
            alt=''
          />
          <img
            src={Modal_example}
            onClick={() => setChoose(choose + 1)}
            alt=''
          />
          {/* <button className='Cancle_btn' type='button'><span>-</span></button> */}
        </div>
        <div className='ShowImg_Small'>
          {/* 여기는 리스트 보내서 찍어야 할거 같은데 아직 잘 못하겠음 */}
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
        <span>6 / 10</span>
      </div>
    </div>
  );
};

export default SelectImages;
