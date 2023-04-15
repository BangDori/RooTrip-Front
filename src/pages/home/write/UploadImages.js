import { useCallback } from 'react';
import camera from '@assets/camera.png';
import EXIF from 'exif-js';
import { getLocation } from '@utils/metadata';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';

const UploadImages = ({ onNextPage, onUploadPhotos, setWrite, Write }) => {
  const createNewPhoto = useCallback((idx, fileInfo, exifdata) => {
    const newPhoto = {
      photoOrder: idx,
      dateTime: '',
      latitude: '',
      longitude: '',
      url: URL.createObjectURL(fileInfo),
    };

    if (Object.keys(exifdata).length !== 0) {
      const {
        DateTime,
        GPSLatitudeRef,
        GPSLatitude,
        GPSLongitudeRef,
        GPSLongitude,
      } = EXIF.getAllTags(fileInfo);

      const [latitude, longitude] = getLocation(
        GPSLatitudeRef,
        GPSLatitude,
        GPSLongitudeRef,
        GPSLongitude,
      );

      newPhoto.dateTime = DateTime;
      newPhoto.latitude = latitude;
      newPhoto.longitude = longitude;
    }

    return newPhoto;
  }, []);

  const handleUploadPhotos = useCallback(
    async (e) => {
      if (e.length > 10) {
        alert('업로드 가능한 파일의 갯수는 10개입니다.');
        return;
      }

      const promises = [];
      const newPhotos = [];

      Object.entries(e).forEach(([idx, fileInfo]) => {
        const promise = new Promise((resolve) => {
          EXIF.getData(fileInfo, () => {
            const newPhoto = createNewPhoto(
              idx + 1,
              fileInfo,
              fileInfo.exifdata,
            );
            newPhotos.push(newPhoto);
            resolve();
          });
        });

        promises.push(promise);
      });

      await Promise.all(promises);

      onUploadPhotos(newPhotos);
      onNextPage();
    },
    [onNextPage, onUploadPhotos, createNewPhoto],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.gif'],
    },
    multiple: true,
    onDrop: handleUploadPhotos,
  });

  return (
    <div className='First_modal'>
      <div className='Modal_head'>
        <button
          className='MoveModal'
          type='button'
          onClick={() => setWrite(false)}
        >
          취소
        </button>
        <span style={{ margin: '0 95px 0 95px' }}>새 게시글 작성하기</span>
        <button style={{ color: 'white' }} className='MoveModal' type='button'>
          ㅇㅇ
        </button>
      </div>
      <div className='Modal_First_content'>
        <div className='Photo_logo'>
          <img src={camera} alt='카메라 사진' />
        </div>
        <div
          className={cn('upload-section', { isDragActive })}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>이곳을 클릭하거나 사진을 올려주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
