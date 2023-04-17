import Photo from '@components/Write/Photo';
import { useCallback } from 'react';

const SelectImages = ({ photos, setPhotos, onMovePage }) => {
  const setRoute = useCallback(() => {}, []);

  return (
    <div className='Second_modal'>
      <div className='Modal_head'>
        <button
          type='button'
          className='MoveModal F'
          onClick={() => onMovePage(-1)}
        >
          이전
        </button>
        <span>게시 순서 및 경로 설정</span>
        <button
          type='button'
          className='MoveModal Co'
          onClick={() => onMovePage(1)}
        >
          다음
        </button>
      </div>
      <div className='Write_content'>
        <div className='Write_list'>
          {photos.map((photo) => (
            <Photo key={photo.feedOrder} photo={photo} setRoute={setRoute} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectImages;
