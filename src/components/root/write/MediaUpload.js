import { useDropzone } from 'react-dropzone';

import writeIcon from '@assets/write-icon.png';
import useUploadFiles from '@hooks/useUploadFiles';

const Upload = ({ onUpload, notify }) => {
  const { handleUploadFiles } = useUploadFiles({ onUpload, notify });

  // Drag & Drop 기능
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png'],
      'vidoe/*': ['.mp4'],
    },
    multiple: true,
    onDrop: handleUploadFiles,
  });

  return (
    <>
      <p className='write-description'>이번 여행은 어떠셨나요?</p>
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
    </>
  );
};

export default Upload;
