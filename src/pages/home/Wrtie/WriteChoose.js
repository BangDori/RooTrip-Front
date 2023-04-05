import React from 'react';
import Modal_example from '@assets/Modal_example.png';
import { useState } from 'react';

const WriteChoose = ({ pagenum, setPagenum }) => {
  return (
    <div className='Second_modal'>
      <div className='Modal_head'>
        <button
          type='button'
          className='MoveModal F'
          onClick={() => setPagenum(0)}
        >
          이전
        </button>
        <span style={{ margin: '0 95px 0 95px' }}>새 게시글 작성하기</span>
        <button
          type='button'
          className='MoveModal Co'
          onClick={() => setPagenum(2)}
        >
          다음
        </button>
      </div>
      <div className='Modal_content'>
        <div className='Show_repre'>
          <div style={{ display: 'flex' }}>
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
        <div className='ShowImg_Big'>
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
          <img src={Modal_example} alt='' />
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

export default WriteChoose;
