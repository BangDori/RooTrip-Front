import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import completionGIF from '@assets/completion.gif';
import '@styles/root/write/Completion.scss';

const Completion = () => {
  const [isSending, setIsSending] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSending(false);
    }, 2500);
  }, []);

  return (
    <div className='post-wrapper'>
      <div className='completion-box'>
        {isSending && (
          <img
            className='gif-animation'
            src={completionGIF}
            alt='completion gif'
          />
        )}
        {!isSending && (
          <FontAwesomeIcon icon={faCircleCheck} width={160} height={160} />
        )}
      </div>
      <p className='completion-message'>
        {isSending && '여행을 공유하고 있습니다...'}
        {!isSending && '여행이 정상적으로 공유되었습니다'}
      </p>
      <Link to='/trip'>
        <button className='confirm-button'>확인</button>
      </Link>
    </div>
  );
};

export default Completion;
