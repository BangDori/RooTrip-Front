// 댓글 관리를 위한 컴포넌트

import React, { useState } from 'react';
import Profile from '@assets/태훈이 프사.jpg';

const Comment = () => {
  const [comment, setComment] = useState('');

  return (
    <div className='comment_section'>
      <div className='comment_container'></div>
      <div className='comment_box'>
        <img src={Profile} alt='프로필 사진' />
        <input
          className='comment_input'
          type='text'
          name='comment'
          value={comment}
          placeholder='댓글을 입력하세요.'
        ></input>
      </div>
    </div>
  );
};

export default Comment;
