import React, { useCallback, useState } from 'react';
import '@styles/home/Write.scss';
import UploadImages from './UploadImages';
import SelectImages from './SelectImages';
import WriteContent from './WriteContent';

const Write = ({ onChangeMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [article, setArticle] = useState({});

  const onMovePage = useCallback(
    (move) => {
      if (currentPage + move === -1) {
        onChangeMode();
        return;
      }

      if (currentPage + move === 3) {
        // photos aws 서버에 올리기

        // 서버로 데이터 묶어서 전송하기
        const writing = {
          photos,
          routes,
          article,
        };

        // eslint-disable-next-line no-console
        console.log(writing);

        // onChangeMode();
        return;
      }

      setCurrentPage((prevPage) => prevPage + move);
    },
    [photos, routes, article, currentPage, onChangeMode],
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
            setRoutes={setRoutes}
            setPhotos={setPhotos}
            onMovePage={onMovePage}
          />
        )}
        {currentPage === 2 && (
          <WriteContent onMovePage={onMovePage} onSetArticle={setArticle} />
        )}
      </div>
    </div>
  );
};

export default Write;
