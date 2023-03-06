import LoginContainer from './LoginContainer';
import SocialLogin from './SocialLogin';
import Title from './Title';
import '../../styles/login/login.css';

const Index = () => {
  return (
    <div className='LoginPage'>
      <Title />
      <LoginContainer />
      <SocialLogin />
    </div>
  );
};

export default Index;
