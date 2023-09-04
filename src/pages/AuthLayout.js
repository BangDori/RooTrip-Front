import { Link, Outlet } from 'react-router-dom';

import logoIcon from '@assets/logo-icon.png';
import '@styles/AuthLayout.scss';

const AuthLayout = () => {
  return (
    <section className='auth-section'>
      <div className='logo-container'>
        <Link to='/'>
          <img className='logo-icon' src={logoIcon} alt='logo icon' />
        </Link>
      </div>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
