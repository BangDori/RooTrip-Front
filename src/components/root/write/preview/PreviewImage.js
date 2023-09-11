import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const PreviewImage = ({ file, onRemove }) => {
  return (
    <div
      key={file.fileName}
      className={`upload-image ${file.dateTime ? 'coord' : 'no-coord'}`}
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
