import React from 'react';
import '@styles/home/Write.scss';
import WriteFirst from './WriteFirst';
import WriteChoose from './WriteChoose';
import WriteContent from './WriteContent';
import { useState } from 'react';
const WriteBase = ({ setModal }) => {
  const ModalClose = () => {
    setModal(false);
  };
  const [pagenum, setPagenum] = useState(0);
  return (
    <div className='Modal_full'>
      <button className='close_modal_btn' type='button' onClick={ModalClose}>
        x
      </button>
      <div className='Content_box'>
        {pagenum === 0 ? (
          <WriteFirst pagenum={pagenum} setPagenum={setPagenum} />
        ) : (
          ''
        )}
        {pagenum === 1 ? (
          <WriteChoose pagenum={pagenum} setPagenum={setPagenum} />
        ) : (
          ''
        )}
        {pagenum === 2 ? (
          <WriteContent pagenum={pagenum} setPagenum={setPagenum} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default WriteBase;
