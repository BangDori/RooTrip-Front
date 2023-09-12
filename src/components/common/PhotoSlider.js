import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import BeatLoader from 'react-spinners/BeatLoader';

import useUploadFiles from '@hooks/useUploadFiles';

const PhotoSlider = ({ files, onUpload, notify, left }) => {
  const { handleUploadFiles } = useUploadFiles({ onUpload });
  const [isSubmitting, setIsSubmitting] = useState('');

  // Drag & Drop 기능
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.heic'],
      'vidoe/*': ['.mp4'],
    },
    multiple: true,
    onDrop: (dropFiles) => handleUploadFiles(dropFiles, setIsSubmitting),
    maxFiles: 10 - files.length,
    onDropRejected: (dropFiles) => {
      if (dropFiles.length + files.length > 10) {
        notify('업로드 가능한 파일은 10개 이하입니다.', 'error');
        return;
      }

      notify('이미지 형식을 확인해주세요.', 'error');
    },
    onDropAccepted: () => setIsSubmitting(true),
  });

  return (
    <div className='view-photos' style={{ left: `${-left}px` }}>
      {files}
      {!isSubmitting && (
        <div className='upload-button' {...getRootProps()}>
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faPlus} />
        </div>
      )}
      {isSubmitting && (
        <div className='upload-button submitting'>
          <BeatLoader size={8} />
        </div>
      )}
    </div>
  );
};

export default PhotoSlider;
