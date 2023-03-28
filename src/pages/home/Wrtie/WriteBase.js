import React from 'react';
import '@styles/home/Write.scss';
import WriteFirst from './WriteFirst';
import WriteChoose from './WriteChoose';
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
        {/* <WriteFirst /> */}
        <WriteChoose />
      </div>
    </div>
  );
};

export default WriteBase;
