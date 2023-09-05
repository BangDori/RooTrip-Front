import { Link } from 'react-router-dom';

const TripPage = () => {
  return (
    <div style={{ position: 'absolute' }}>
      <button>
        <Link to='/logout'>로그아웃</Link>
      </button>
    </div>
  );
};

export default TripPage;
