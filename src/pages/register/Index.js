import Title from '@components/wrapper/Title';
import TOC from '@components/wrapper/TOC';
import '@styles/components/title.scss';
import '@styles/register/register.scss';
import { registerTable } from '@constants/table';

import RegisterContainer from './RegisterContainer';

const Index = () => (
  <>
    <Title title='JOIN MEMBERS' className='registerTitle' />
    <div className='Register_main'>
      <TOC table={registerTable} />
      <RegisterContainer />
    </div>
  </>
);

export default Index;
