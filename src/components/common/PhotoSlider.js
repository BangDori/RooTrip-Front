import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import useUploadFiles from '@hooks/useUploadFiles';

const PhotoSlider = ({ files, onUpload, notify, left }) => {
  const { handleUploadFiles } = useUploadFiles({ onUpload, notify });

  // Drag & Drop 기능
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.mp4'],
    },
    multiple: true,
    onDrop: handleUploadFiles,
  });

  return (
    <div className='view-photos' style={{ left: `${-left}px` }}>
      {files}
      <div className='upload-button' {...getRootProps()}>
        <input {...getInputProps()} />
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default PhotoSlider;
