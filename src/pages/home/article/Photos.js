// 사진 배열 관리를 위한 컴포넌트

import React, { useCallback } from 'react';

import '@styles/home/photo.scss';

const Photos = ({ photos, current, onChangePhoto }) => {
  const width = photos.length * 456;

  const prevPhotoHandler = useCallback(() => {
    onChangePhoto(-1);
  }, [onChangePhoto]);
  const nextPhotoHandler = useCallback(() => {
    onChangePhoto(1);
  }, [onChangePhoto]);

  return (
    <div className='photo-list'>
      {current > 0 && (
        <button className='move-button prev_move' onClick={prevPhotoHandler}>
          prev
        </button>
      )}
      <div
        className='photo-slide'
        style={{ width, right: `${current * 456}px` }}
      >
        {photos.map((photo) => (
          <div key={photo.id} className='photo'>
            <img src={photo.imageUrl} alt={`${photo.id}-image`} />
          </div>
        ))}
      </div>
      {current < photos.length - 1 && (
        <button className='move-button next_move' onClick={nextPhotoHandler}>
          next
        </button>
      )}
    </div>
  );
};

export default Photos;
