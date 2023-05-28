// 사진 배열 관리를 위한 컴포넌트

import React from 'react';

const Photos = ({ photos }) => {
  return (
    <div className='article_head'>
      <span className='photo_page'>1 / {photos.length}</span>
    </div>
  );
};

export default Photos;
