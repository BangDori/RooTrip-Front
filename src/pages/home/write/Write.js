import React, { useCallback, useState } from 'react';
import '@styles/home/Write.scss';
import UploadImages from './UploadImages';
import SelectImages from './SelectImages';
import WriteContent from './WriteContent';

const Write = ({ onChangeMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [content, setContent] = useState(null);

  const onMovePage = useCallback(
    (move) => {
      if (currentPage + move === -1) {
        onChangeMode();
        return;
      }

      setCurrentPage((prevPage) => prevPage + move);
    },
    [currentPage, onChangeMode],
  );

  return (
    <div className='Main_content'>
      <div className='Content_box'>
        {currentPage === 0 && (
          <UploadImages onMovePage={onMovePage} onUploadPhotos={setPhotos} />
        )}
        {currentPage === 1 && (
          <SelectImages
            photos={photos}
            setPhotos={setPhotos}
            onMovePage={onMovePage}
          />
        )}
        {currentPage === 2 && (
          <WriteContent onMovePage={onMovePage} onSaveContent={setContent} />
        )}
      </div>
    </div>
  );
};

export default Write;
