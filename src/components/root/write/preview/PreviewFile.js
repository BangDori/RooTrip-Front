import PreviewImage from './PreviewImage';
import PreviewVideo from './PreviewVideo';

const PreviewFile = ({ file, onRemove, notify }) => {
  if (file.type === 'video/mp4') {
    return <PreviewVideo file={file} onRemove={onRemove} notify={notify} />;
  }

  return <PreviewImage file={file} onRemove={onRemove} />;
};

export default PreviewFile;
