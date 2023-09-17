import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { loadFile } from '@store/custom';

const PreviewVideo = ({ file, onRemove, notify }) => {
  const { fileName } = useSelector((state) => state.custom);
  const dispatch = useDispatch();

  let className = '';

  if (file.status === 'specified') className = 'specified-coord';
  else if (file.status === 'unspecified') className = 'unspecified-coord';
  if (file.fileName === fileName) className = 'custom-coord';

  const onLoadMetadata = (e) => {
    const { duration } = e.target;

    if (duration > 60) {
      notify('영상 길이는 1분 이내이어야 합니다.', 'error');
      onRemove(file.fileName);
    }
  };

  const setCustomLocation = () => {
    if (file.status === 'specified') {
      return;
    }

    dispatch(loadFile({ fileName: file.fileName }));
  };

  return (
    <div key={file.fileName} className={`upload-image ${className}`}>
      <button
        className='image-xmark'
        onClick={onRemove.bind(null, file.fileName)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <video
        src={file.url}
        loop
        autoPlay
        muted={true}
        preload='metadata'
        onLoadedMetadata={onLoadMetadata}
        onClick={setCustomLocation}
        width='128px'
        height='128px'
        style={{ borderRadius: '15px' }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default PreviewVideo;
