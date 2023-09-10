import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeUp,
  faVolumeXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const Video = ({ file, onRemove }) => {
  const [muted, setMuted] = useState(true);
  const [showMutedIcon, setShowMutedIcon] = useState(false);

  const onChangeMuted = (e) => {
    setMuted(!e.target.muted);
    setShowMutedIcon(true);
  };

  useEffect(() => {
    if (showMutedIcon) {
      setTimeout(() => {
        setShowMutedIcon(false);
      }, 1500);
    }
  }, [showMutedIcon]);

  return (
    <div
      key={file.fileName}
      className={`upload-image ${file.dateTime ? 'coord' : 'no-coord'}`}
    >
      <div className='image-volume'>
        {showMutedIcon && !muted && <FontAwesomeIcon icon={faVolumeUp} />}
        {showMutedIcon && muted && <FontAwesomeIcon icon={faVolumeXmark} />}
      </div>
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
        muted={muted}
        preload='metadata'
        onClick={onChangeMuted}
        width='128px'
        height='128px'
        style={{ borderRadius: '15px' }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
