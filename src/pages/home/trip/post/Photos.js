import { useCallback } from 'react';

import LeftDirectionImage from '@assets/post/left-direction.png';
import RightDirectionImage from '@assets/post/right-direction.png';
import '@styles/home/photo.scss';

const Photos = ({ photoWidth, photos, current, onChangePhoto }) => {
  const width = photos.length * photoWidth;

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
          <img src={LeftDirectionImage} alt='left direction image' />
        </button>
      )}
      <div
        className='photo-slide'
        style={{ width, right: `${current * photoWidth}px` }}
      >
        {photos.map((photo) => (
          <div key={photo.id} className='photo'>
            <img src={photo.imageUrl} alt={`${photo.id}-image`} />
          </div>
        ))}
      </div>
      {current < photos.length - 1 && (
        <button className='move-button next_move' onClick={nextPhotoHandler}>
          <img src={RightDirectionImage} alt='right direction image' />
        </button>
      )}
    </div>
  );
};

export default Photos;
