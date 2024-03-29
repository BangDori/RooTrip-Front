import logoIcon from '@assets/logo-icon.png';
import '@styles/root/login/Login.scss';

import LoginForm from './LoginForm';
import LoginNavigation from './LoginNavigation';

const Login = ({ error, isSubmitting }) => {
  return (
    <section className='login-section'>
      <img className='logo' src={logoIcon} alt='logo icon' />
      <h3 className='description'>여행의 재미를 더하는 SNS</h3>

      <LoginForm error={error} isSubmitting={isSubmitting} />
      <LoginNavigation />
    </section>
  );
};

export default Login;
