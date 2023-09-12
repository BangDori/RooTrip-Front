import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { loadFile } from '@store/custom';

const PreviewImage = ({ file, onRemove }) => {
  const { fileName } = useSelector((state) => state.custom);
  const dispatch = useDispatch();
  let className = '';

  if (file.status === 'specified') className = 'specified-coord';
  else if (file.status === 'unspecified') className = 'unspecified-coord';

  if (file.fileName === fileName) className = 'custom-coord';

  const setCustomLocation = () => {
    if (file.status === 'specified') {
      return;
    }

    dispatch(loadFile({ fileName: file.fileName }));
  };

  return (
    <div
      key={file.fileName}
      className={`upload-image ${className}`}
      onClick={setCustomLocation}
    >
      <button
        className='image-xmark'
        onClick={onRemove.bind(null, file.fileName)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <img src={file.url} alt='user upload photo' />
    </div>
  );
};

export default PreviewImage;
