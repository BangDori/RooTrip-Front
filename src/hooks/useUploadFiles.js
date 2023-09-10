import { useCallback } from 'react';
import EXIF from 'exif-js';

import { getLocation } from '@utils/metadata';

const useUploadFiles = ({ notify, onUpload }) => {
  const createNewPhoto = useCallback((fileInfo, exifdata) => {
    const newPhoto = {
      type: fileInfo.type,
      fileName: fileInfo.name,
      url: URL.createObjectURL(fileInfo),
      dateTime: '',
      coordinate: {},
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
      newPhoto.coordinate.latitude = latitude;
      newPhoto.coordinate.longitude = longitude;
    }

    return newPhoto;
  }, []);

  const createNewVideo = useCallback((fileInfo) => {
    const newVideo = {
      type: fileInfo.type,
      fileName: fileInfo.name,
      url: URL.createObjectURL(fileInfo),
      dateTime: '',
      coordinate: {},
    };

    return newVideo;
  }, []);

  // feed 순서대로 사진 정렬하기
  const sort = useCallback(
    (photos) =>
      photos.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)),
    [],
  );

  // 사진 업로드시 호출되는 함수
  const handleUploadFiles = async (e) => {
    if (e.length > 10) {
      notify('업로드 가능한 파일은 10개 이하입니다.');
      return null;
    }

    const promises = [];
    const newFiles = [];

    Object.entries(e).forEach(([fileInfo]) => {
      const promise = new Promise((resolve) => {
        const { name } = e[fileInfo];

        switch (name.split('.')[1]) {
          case 'heic':
            // eslint-disable-next-line no-console
            console.log('HEIC TYPE');
            break;
          case 'mp4':
            const newVideo = createNewVideo(e[fileInfo]);
            newFiles.push(newVideo);
            resolve();
            break;
          default:
            EXIF.getData(e[fileInfo], () => {
              const newPhoto = createNewPhoto(
                e[fileInfo],
                e[fileInfo].exifdata,
              );
              newFiles.push(newPhoto);
              resolve();
            });
        }
      });

      promises.push(promise);
    });

    await Promise.all(promises);

    sort(newFiles);
    onUpload(newFiles);
  };

  return { handleUploadFiles };
};

export default useUploadFiles;
