// 사진 배열 관리를 위한 컴포넌트

import React from 'react';

const Photos = ({ photos }) => {
  return (
    <div className='Photo'>
      <img src={photos[0].imageUrl} alt='사진' />
    </div>
  );
};

export default Photos;
