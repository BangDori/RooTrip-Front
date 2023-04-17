import { useState } from 'react';
import ImgList from '@components/Write/ImgList';

const SelectImages = ({ photos, setPhotos, onMovePage }) => {
  const [choose, setChoose] = useState(0);
  const [check, setCheck] = useState(false);

  const Choosehandle = () => {
    if (check === false) {
      setChoose(choose + 1);
      setCheck(true);
    } else {
      setChoose(choose - 1);
      setCheck(false);
    }
  };

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
        <span style={{ margin: '0 88px 0 88px' }}>게시 순서 및 경로 설정</span>
        <button
          type='button'
          className='MoveModal Co'
          onClick={() => onMovePage(1)}
        >
          다음
        </button>
      </div>
      <div className='Write_content'>
        <ImgList photos={photos}></ImgList>
      </div>
    </div>
  );
};

export default SelectImages;
