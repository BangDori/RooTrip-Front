import React, { useCallback } from 'react';
import camera from '@assets/camera.png';
import EXIF from 'exif-js';
import { getLocation } from '@utils/metadata';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';

const UploadImages = ({ onNextPage, onUploadPhotos }) => {
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
      const promises = [];
      const newPhotos = [];

      for (const [idx, fileInfo] of Object.entries(e)) {
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
      }

      await Promise.all(promises);

      onUploadPhotos(newPhotos);
      onNextPage();
    },
    [onNextPage, onUploadPhotos, createNewPhoto],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: handleUploadPhotos,
  });

  return (
    <div className='First_modal'>
      <div className='Modal_head'>
        <span>새 게시글 작성하기</span>
      </div>
      <div className='Modal_First_content'>
        <div className='Photo_logo'>
          <img src={camera} alt='카메라 사진' />
        </div>
        <div className='ChoosePhoto'>
          <div
            className={cn('upload-section', { isDragActive })}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>사진을 올려주세요.</p>
            ) : (
              <button type='button' className='file-upload_button'>
                사진을 선택하거나 올려주세요.
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
