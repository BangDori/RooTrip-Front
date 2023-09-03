import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <p>This is Error Page!</p>
      <p>
        Go to a <Link to='/'>Home</Link>
      </p>
    </div>
  );
};

export default Error;
