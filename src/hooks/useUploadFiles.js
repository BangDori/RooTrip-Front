import { useCallback } from 'react';
import exifr from 'exifr';
import heic2any from 'heic2any';

const useUploadFiles = ({ onUpload }) => {
  const createNewPhoto = useCallback(async (fileInfo) => {
    const newPhoto = {
      type: fileInfo.type,
      fileName: fileInfo.name,
      url: URL.createObjectURL(fileInfo),
      dateTime: '',
      coordinate: {},
    };

    if (fileInfo.type === 'image/heic') {
      const convertedJPEG = await heic2any({
        blob: fileInfo,
        toType: 'image/jpeg',
      }).then(
        (resultBlob) =>
          new File([resultBlob], `${fileInfo.name.split('.')[0]}.jpg`, {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          }),
      );

      newPhoto.url = URL.createObjectURL(convertedJPEG);
    }

    const data = await exifr.parse(fileInfo);

    if (
      Object.keys(data).includes('latitude') &&
      Object.keys(data).includes('longitude')
    ) {
      newPhoto.dateTime = new Date(data.DateTimeOriginal).toISOString();
      newPhoto.coordinate.latitude = data.latitude;
      newPhoto.coordinate.longitude = data.longitude;
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
  const handleUploadFiles = useCallback(async (e) => {
    const promises = [];
    const newFiles = [];

    Object.entries(e).forEach(async ([, file]) => {
      const { type } = file;

      if (type.includes('image') && type !== 'image/gif') {
        const newPhoto = createNewPhoto(file);
        promises.push(newPhoto);
        return;
      }

      const newVideo = createNewVideo(file);
      newFiles.push(newVideo);
    });

    // 모든 Promise를 병렬로 실행하고 결과를 기다립니다.
    const photoResults = await Promise.all(promises);
    newFiles.push(...photoResults);

    sort(newFiles);
    onUpload(newFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleUploadFiles };
};

export default useUploadFiles;
