import React from 'react';
import '../../styles/home/Write.scss';
import Write_First from './Write_First';
const WriteBase = ({ setModal }) => {
  const ModalClose = () => {
    setModal(false);
  };

  return (
    <div className='Modal_full'>
      <button className='close_modal_btn' type='button' onClick={ModalClose}>
        x
      </button>
      <div className='Content_box'>
        <Write_First />
      </div>
    </div>
  );
};

export default WriteBase;
