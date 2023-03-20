import React from 'react';
import RegisterTitle from './RegisterTitle';
import RegisterTOC from './RegisterTOC';
import RegisterContainer from './RegisterContainer';

const Index = () => {
  return (
    <>
      <RegisterTitle />
      <div className='Register_main'>
        <RegisterTOC />
        <RegisterContainer />
      </div>
    </>
  );
};

export default Index;
