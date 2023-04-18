import React, { useCallback, useState } from 'react';
import '@styles/home/Write.scss';
import { getPreSignedUrl, uploadFileToS3 } from '@services/image';
import UploadImages from './UploadImages';
import SelectImages from './SelectImages';
import WriteContent from './WriteContent';

const Write = ({ onChangeMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [article, setArticle] = useState({});
  const [imageUrls, setImageUrls] = useState([]);

  const onMovePage = useCallback(
    async (move) => {
      if (currentPage + move === -1) {
        onChangeMode();
        return;
      }

      if (currentPage + move === 3) {
        // url 받아오기
        const fileNames = photos.map((photo) => photo.fileName);
        const url = await getPreSignedUrl(fileNames);

        // pre-signed url에 사진 파일 전송하기
        const newPhotos = await Promise.all(
          photos.map(async (photo) => {
            const data = await fetch(photo.url);
            const blob = await data.blob();
            const file = new File([blob], `${Date.now()}-image.jpg`, {
              type: 'image/jpeg',
            });

            try {
              const signedUrl = await uploadFileToS3(file, url);

              return photo.url !== signedUrl ? signedUrl : photo.url;
            } catch (e) {
              return null;
            }
          }),
        );

        // s3에 업로드된 주소로 url 변경

        // 서버로 데이터 전송하기
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
