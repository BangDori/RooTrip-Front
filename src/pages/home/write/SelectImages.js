import { useState } from 'react';
import modalExample from '@assets/modalExample.png';
import NotChoose from '@components/Write/NotChoose';
import Choose from '@components/Write/Choose';

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
        <span style={{ margin: '0 95px 0 95px' }}>새 게시글 작성하기</span>
        <button
          type='button'
          className='MoveModal Co'
          onClick={() => onNextPage()}
        >
          다음
        </button>
      </div>
      <div className='Modal_content'>
        {/* 사진이 한장이라도 선택되면 Choose 컴포넌트 */}
        {check === false ? <NotChoose /> : <Choose />}
        <div className='ShowImg_Big'>
          <img src={modalExample} onClick={Choosehandle} alt='' />
          <img src={modalExample} onClick={Choosehandle} alt='' />
          <img src={modalExample} onClick={Choosehandle} alt='' />
          <img src={modalExample} onClick={Choosehandle} alt='' />
          <img src={modalExample} onClick={Choosehandle} alt='' />
          {/* <button className='Cancle_btn' type='button'><span>-</span></button> */}
        </div>
        <div className='ShowImg_Small'>
          {/* 여기는 리스트 보내서 찍어야 할거 같은데 아직 잘 못하겠음 */}
          <img src={modalExample} alt='' />
          <img src={modalExample} alt='' />
          <img src={modalExample} alt='' />
          <img src={modalExample} alt='' />
          <img src={modalExample} alt='' />
          <img src={modalExample} alt='' />
          <button type='button'>+</button>
        </div>
      </div>
      <div className='footer'>
        <span>6 / 10</span>
      </div>
    </div>
  );
};

export default SelectImages;
