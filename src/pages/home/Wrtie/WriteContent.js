import React from 'react';
import Modal_example from '@assets/Modal_example.png';
import { useState } from 'react';

const WriteContent = ({ pagenum, setPagenum }) => {
  const [show, setShow] = useState(0);
  return (
    <div className='Last_modal'>
      <div className='Modal_head'>
        <button
          type='button'
          className='MoveModal Ch'
          onClick={() => setPagenum(1)}
        >
          이전
        </button>
        <span style={{ margin: '0 95px 0 95px' }}>새 게시글 작성하기</span>
        <button type='button' className='MoveModal'>
          완료
        </button>
      </div>
      <div className='Modal_content'>
        <div className='Show_repre'>
          <div style={{ display: 'flex' }}>
            {/* 여기에 사진 있으면 img태그 없으면 div로 띄우기 class이름은 그대로 */}
            <div className='Order_repre'>1</div>
            <div className='Order_repre'>2</div>
            <div className='Order_repre'>3</div>
            <div className='Order_repre'>4</div>
            <div className='Order_repre'>5</div>
            <div className='Order_repre'>6</div>
            <div className='Order_repre' style={{ margin: 0 }}>
              7
            </div>
          </div>
        </div>
        <div className='Write_content'>
          <div className='Write_Title'>
            <input type='text' placeholder='제목을 입력해주세요' />
          </div>
          <div className='Write_Main_content'>
            <textarea type='text' placeholder='내용을 입력해주세요' />
          </div>
        </div>
      </div>
      <div className='footer'>
        <div className='With_who'>
          <span>With</span>
          <input type='text' />
        </div>
        <div className='Show_who_btns'>
          <button
            onClick={() => setShow(0)}
            className={show === 0 ? 'choose_btn' : ''}
          >
            공개
          </button>
          <button
            onClick={() => setShow(1)}
            className={show === 1 ? 'choose_btn' : ''}
          >
            비공개
          </button>
          <button
            onClick={() => setShow(2)}
            className={show === 2 ? 'choose_btn' : ''}
          >
            나만보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
