import React from 'react';
import '@styles/components/modalChooseTheme.scss';

const ModalTheme = ({ closeModal }) => {
  return (
    <>
      <div className='modalChooseTheme'>
        <div className='title'>
          <span>테마 선택</span>
          <button type='button' onClick={closeModal}>
            x
          </button>
        </div>
        <div className='modalContent'>
          <div className='bigTheme'>
            <div className='title'>
              <span>대분류</span>
            </div>
          </div>
          <div className='bigTheme'>
            <div className='title'>
              <span>중분류</span>
            </div>
          </div>
          <div className='bigTheme'>
            <div className='title'>
              <span>소분류</span>
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

export default ModalTheme;
