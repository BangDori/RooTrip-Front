import { Link, useRouteError } from 'react-router-dom';
import '@styles/Error.scss';

const ErrorPage = () => {
  const error = useRouteError();

  let status = 404;
  let message = '요청한 페이지를 찾을 수 없습니다.';
  let link = '/';

  if (typeof error.data === 'object' && error !== null) {
    status = error.status;
    message = error.data.message;
    link = error.data.link;
  }

  return (
    <div className='error-container'>
      <h1 className='title'>{status}</h1>
      <p className='content'>{message}</p>
      <Link to={link}>
        <button>홈으로</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
