import { useCallback } from 'react';
import camera from '@assets/camera.png';
import EXIF from 'exif-js';
import { getLocation } from '@utils/metadata';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';

const UploadImages = ({ onMovePage, onUploadPhotos }) => {
  // 메타 정보와 함께 사진 생성하기
  const createNewPhoto = useCallback((idx, fileInfo, exifdata) => {
    const newPhoto = {
      id: idx,
      fileName: `${Date.now()}-${fileInfo.name}`,
      feedOrder: idx,
      dateTime: '',
      latitude: '',
      longitude: '',
      url: URL.createObjectURL(fileInfo),
    };

    if (
      Object.keys(exifdata).includes('GPSLatitude') &&
      Object.keys(exifdata).includes('GPSLongitude')
    ) {
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

  // feed 순서대로 사진 정렬하기
  const sort = useCallback(
    (photos) => photos.sort((a, b) => a.feedOrder - b.feedOrder),
    [],
  );

  // 사진 업로드시 호출되는 함수
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
              Number(idx) + 1,
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
      sort(newPhotos);
      onMovePage(1);
    },
    [onMovePage, onUploadPhotos, createNewPhoto, sort],
  );

  // Drag & Drop 기능
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
          onClick={() => onMovePage(-1)}
        >
          취소
        </button>
        <span>새 게시글 작성하기</span>
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
