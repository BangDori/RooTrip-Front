import React, { useCallback, useState } from 'react';
import { getPreSignedUrl, uploadFileToS3 } from '@services/image';
import { createPost } from '@services/post';
import { useSelector } from 'react-redux';
import UploadImages from './UploadImages';
import SelectImages from './SelectImages';
import WriteContent from './WriteContent';
import '@styles/home/Write.scss';

const Write = ({ onChangeMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const { accessToken } = useSelector((state) => state.accessToken);

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

          await uploadFileToS3(formData.get('file'), urls[index]).catch(
            // eslint-disable-next-line no-console
            (e) => console.log(e.message),
          );

          const { url, ...newPhoto } = photo;
          return newPhoto;
        }),
      );

      // 서버로 데이터 전송하기
      const post = {
        newPhotos,
        routes,
        article,
      };

      try {
        const { message } = await createPost(accessToken, post);
        alert(message);
        onChangeMode();
      } catch (e) {
        alert(e.message);
      }
    },
    [onChangeMode, accessToken, photos, routes],
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
