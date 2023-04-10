import React, { useState } from 'react';
import { Button } from '@mui/material';
import '@styles/fallow/Fallowing.scss';

const Fallow = () => {
  const [value, setValue] = useState(0);
  const [check, setCheck] = useState('CF');

  const countPlus = () => {
    setValue(value + 1);
    setCheck('CF_true');
  };

  const countMinus = () => {
    setValue(value - 1);
    setCheck('CF_false');
  };

  return (
    <div>
      <div>
        <h1>Fallowing Page</h1>
      </div>
      <div className='fallow'>
        <Button
          color='primary'
          size='large'
          variant='elevated'
          className='fallowBtn'
          onClick={countPlus}
        >
          팔로우
        </Button>
        <Button
          color='primary'
          size='large'
          variant='elevated'
          className='fallowBtn'
          onClick={countMinus}
        >
          팔로우 해제
        </Button>
      </div>
      {check === 'CF' ? (
        ''
      ) : (
        <div className='text'>
          {check === 'CF_true' ? (
            <span>팔로우 했습니다!</span>
          ) : (
            <span>팔로우 해제했습니다!</span>
          )}
        </div>
      )}
      <span>현재 팔로우 수 = {value}</span>
    </div>
  );
};

export default Fallow;
