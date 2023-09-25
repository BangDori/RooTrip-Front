import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import HashLoader from 'react-spinners/HashLoader';

import writeIcon from '@assets/write-icon.png';
import useUploadFiles from '@hooks/useUploadFiles';

const Upload = ({ onUpload, notify }) => {
  const { handleUploadFiles } = useUploadFiles({ onUpload });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dot, setDot] = useState('.');

  // 제출 애니메이션
  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        if (dot.length >= 5) {
          setDot(() => '.');
        } else {
          setDot((prev) => `${prev}.`);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isSubmitting, dot]);

  // Drag & Drop 기능
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.heic'],
      'vidoe/*': ['.mp4'],
    },
    multiple: true,
    onDrop: (dropFiles) => handleUploadFiles(dropFiles, setIsSubmitting),
    maxFiles: 10,
    onDropRejected: (dropFiles) => {
      if (dropFiles.length > 10) {
        notify('업로드 가능한 파일은 10개 이하입니다.', 'error');
        return;
      }

      notify('이미지 형식을 확인해주세요.', 'error');
    },
    onDropAccepted: () => setIsSubmitting(true),
  });

  return (
    <>
      <p className='write-description'>이번 여행은 어떠셨나요?</p>
      {!isSubmitting && (
        <section
          className={`write-section ${isDragActive ? 'dragging' : ''}`}
          {...getRootProps()}
        >
          <img src={writeIcon} alt='write icon' />
          <p>사진이나 영상을 이곳에 올리세요</p>
          <button className='file-upload-button'>
            <input {...getInputProps()} />
            컴퓨터에서 선택
          </button>
        </section>
      )}
      {isSubmitting && (
        <section className='write-section'>
          <HashLoader
            color='#0095f6'
            size='64'
            aria-label='Loading Spinner'
            data-testid='loader'
          />
          <p className='loading-message'>
            사진의 위치를 탐색하고 있습니다 {dot}
          </p>
        </section>
      )}
    </>
  );
};

export default Upload;
