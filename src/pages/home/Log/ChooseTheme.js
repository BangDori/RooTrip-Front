import React, { useState } from 'react';

import Modal from '../../../components/wrapper/Modal';
import ModalLocation from './ModalLocation';
import ModalTheme from './ModalTheme';

const ChooseTheme = () => {
  const [clickChoose, setClickChoose] = useState(false);
  const [clickChooseLocation, setClickChooseLocation] = useState(false);
  const [clickChooseTheme, setClickChooseTheme] = useState(false);
  const openModalLocation = () => {
    setClickChooseLocation(true);
    setClickChoose(true);
  };
  const openModalTheme = () => {
    setClickChooseTheme(true);
    setClickChoose(true);
  };
  const closeModal = () => {
    setClickChooseLocation(false);
    setClickChooseTheme(false);
    setClickChoose(false);
  };
  return (
    <>
      <div className='content'>
        <div className='title'>
          <span>실시간 인기 명소</span>
        </div>
        <div className='chooseBox'>
          <div className='chooseLocation'>
            <span>지역</span>
            <button
              className='buttonLocation'
              type='button'
              onClick={openModalLocation}
            >
              선택
            </button>
          </div>
          <div className='chooseTheme'>
            <span>테마</span>
            <button
              className='buttonLocation'
              type='button'
              onClick={openModalTheme}
            >
              선택
            </button>
          </div>
        </div>
        <div className='searchBox'>
          <button className='searchButton' type='button'>
            검색
          </button>
        </div>
      </div>
      {clickChoose && (
        <Modal>
          {clickChooseLocation ? (
            <ModalLocation closeModal={closeModal} />
          ) : (
            <ModalTheme closeModal={closeModal} />
          )}
        </Modal>
      )}
    </>
  );
};

export default ChooseTheme;
