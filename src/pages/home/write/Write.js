import React, { useCallback } from 'react';
import '@styles/home/Write.scss';
import UploadImages from './UploadImages';
import SelectImages from './SelectImages';
import WriteContent from './WriteContent';
import { useState } from 'react';

const Write = ({ setModal }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [content, setContent] = useState(null);

  const onPrevPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage - 1);
  }, []);

  const onNextPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const ModalClose = useCallback(() => {
    setModal(false);
  }, [setModal]);

  return (
    <div className='Modal_full'>
      <button className='close_modal_btn' type='button' onClick={ModalClose}>
        x
      </button>
      <div className='Content_box'>
        {currentPage === 0 && (
          <UploadImages onNextPage={onNextPage} onUploadPhotos={setPhotos} />
        )}
        {currentPage === 1 && (
          <SelectImages
            photos={photos}
            setPhotos={setPhotos}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
          />
        )}
        {currentPage === 2 && (
          <WriteContent onNextPage={onNextPage} onSaveContent={setContent} />
        )}
      </div>
    </div>
  );
};

export default Write;
