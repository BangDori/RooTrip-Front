import React from 'react';

const ModalLocation = ({ closeModal }) => {
  return (
    <>
      <div className='modalChooseLoaction'>
        <div className='title'>
          <span>지역 선택</span>
          <button type='button' onClick={closeModal}>
            x
          </button>
        </div>
        <div className='modalContent'>
          <div className='wideLocation'>
            <div className='wideTitle'>
              <span>광역시 / 도</span>
            </div>
          </div>
          <div className='smallLocation'>
            <div className='smallTitle'>
              <span>시 / 군 / 구</span>
            </div>
          </div>
        </div>
        <footer>
          <button type='button'>완료</button>
        </footer>
      </div>
    </>
  );
};

export default ModalLocation;
