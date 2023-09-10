import { useCallback } from 'react';
import exifr from 'exifr';
// import heic2any from 'heic2any';

const useUploadFiles = ({ notify, onUpload }) => {
  const createNewPhoto = useCallback(async (fileInfo) => {
    const newPhoto = {
      type: fileInfo.type,
      fileName: fileInfo.name,
      url: URL.createObjectURL(fileInfo),
      dateTime: '',
      coordinate: {},
    };

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
  const handleUploadFiles = async (e) => {
    if (e.length > 10) {
      notify('업로드 가능한 파일은 10개 이하입니다.');
      return null;
    }

    const newFiles = [];
    const promises = [];

    Object.entries(e).forEach(async ([, fileInfo]) => {
      const { type } = fileInfo;

      if (type.includes('image') && type !== 'image/gif') {
        const newPhoto = createNewPhoto(fileInfo);
        promises.push(newPhoto);
        return;
      }

      const newVideo = createNewVideo(fileInfo);
      newFiles.push(newVideo);
    });

    // 모든 Promise를 병렬로 실행하고 결과를 기다립니다.
    const photoResults = await Promise.all(promises);

    // photoResults를 newFiles에 추가합니다.
    newFiles.push(...photoResults);

    // eslint-disable-next-line no-console
    console.log(newFiles);

    sort(newFiles);
    onUpload(newFiles);
  };

  return { handleUploadFiles };
};

export default useUploadFiles;
