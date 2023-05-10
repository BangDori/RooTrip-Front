import React, { useCallback, useState } from 'react';
import '@styles/home/Write.scss';
import { getPreSignedUrl, uploadFileToS3 } from '@services/image';
import { createPost } from '@services/post';
import UploadImages from './UploadImages';
import SelectImages from './SelectImages';
import WriteContent from './WriteContent';

const Write = ({ onChangeMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const onMovePage = useCallback(
    async (move) => {
      if (currentPage + move === -1) {
        onChangeMode();
        return;
      }

      setCurrentPage((prevPage) => prevPage + move);
    },
    [currentPage, onChangeMode],
  );

  const uploadWriteHandler = useCallback(
    async (article) => {
      // url 받아오기
      const fileNames = photos.map((photo) => photo.fileName);
      const urls = await getPreSignedUrl(fileNames);

      // pre-signed url에 사진 파일 전송하기
      const newPhotos = await Promise.all(
        photos.map(async (photo, index) => {
          const data = await fetch(photo.url);
          const blob = await data.blob();
          const file = new File([blob], `${Date.now()}-image.jpg`, {
            type: 'image/jpeg',
          });

          const formData = new FormData();
          formData.append('file', file);

          try {
            const signedUrl = await uploadFileToS3(
              formData.get('file'),
              urls[index],
            );

            return {
              ...photo,
              url: photo.url !== signedUrl ? signedUrl : photo.url,
            };
          } catch (e) {
            return null;
          }
        }),
      );

      // 서버로 데이터 전송하기
      const writing = {
        photos: newPhotos,
        routes,
        article,
      };

      // eslint-disable-next-line no-console
      // console.log(writing);

      const result = await createPost(writing);

      // onChangeMode();
    },
    [photos, routes],
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
          <WriteContent
            onMovePage={onMovePage}
            onUploadWrite={uploadWriteHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Write;
