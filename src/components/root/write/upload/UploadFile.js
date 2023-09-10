import Image from './Image';
import Video from './Video';

const UploadFile = ({ file, onRemove }) => {
  if (file.type === 'video/mp4') {
    return <Video file={file} onRemove={onRemove} />;
  }

  return <Image file={file} onRemove={onRemove} />;
};

export default UploadFile;
