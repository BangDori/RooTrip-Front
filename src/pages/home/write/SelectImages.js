import { useState } from 'react';
import exampleimg1 from '@assets/LoginMarker1.jpg';
import exampleimg2 from '@assets/LoginMarker2.jpg';
import exampleimg3 from '@assets/LoginMarker3.jpg';
import ImgList from '../../../components/Write/ImgList';

const SelectImages = ({ photos, setPhotos, onPrevPage, onNextPage }) => {
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
          onClick={() => onPrevPage()}
        >
          이전
        </button>
        <span style={{ margin: '0 88px 0 88px' }}>게시 순서 및 경로 설정</span>
        <button
          type='button'
          className='MoveModal Co'
          onClick={() => onNextPage()}
        >
          다음
        </button>
      </div>
      <div className='Write_content'>
        <ImgList></ImgList>
      </div>
    </div>
  );
};

export default SelectImages;
