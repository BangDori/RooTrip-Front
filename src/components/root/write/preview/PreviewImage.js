import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const PreviewImage = ({ file, onRemove }) => {
  let className = '';

  if (file.status === 'specified') className = 'specified-coord';
  else if (file.status === 'custom') className = 'custom-coord';
  else if (file.status === 'unspecified') className = 'unspecified-coord';

  return (
    <div key={file.fileName} className={`upload-image ${className}`}>
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
