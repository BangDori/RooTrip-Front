import Login from './Login';
import SocialLogin from './SocialLogin';
import Title from './Title';
import '../../styles/login/login.scss';

const Index = () => {
  return (
    <div className='LoginPage'>
      <Title />
      <Login />
      <SocialLogin />
    </div>
  );
};

export default Index;