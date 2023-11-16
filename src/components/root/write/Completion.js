import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import completionGIF from '@assets/completion.gif';
import '@styles/root/write/Completion.scss';

const Completion = ({ isSubmitting }) => {
  const [dot, setDot] = useState('.');

  // 제출 애니메이션
  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        if (dot.length >= 5) {
          setDot(() => '.');
        } else {
          setDot((prev) => `${prev}.`);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isSubmitting, dot]);

  return (
    <div className='post-wrapper'>
      <div className='completion-box'>
        {isSubmitting && (
          <img
            className='gif-animation'
            src={completionGIF}
            alt='completion gif'
          />
        )}
        {!isSubmitting && (
          <FontAwesomeIcon icon={faCircleCheck} width={160} height={160} />
        )}
      </div>
      <p className='completion-message'>
        {isSubmitting && `여행을 공유하고 있습니다 ${dot}`}
        {!isSubmitting && '여행이 정상적으로 공유되었습니다'}
      </p>
      {isSubmitting && (
        <button className='confirm-button wait-btn'>확인</button>
      )}
      {!isSubmitting && (
        <Link to='/trip'>
          <button className='confirm-button'>확인</button>
        </Link>
      )}
    </div>
  );
};

export default Completion;
