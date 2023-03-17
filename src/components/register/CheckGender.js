import React from 'react';
import Button from '@components/Button';
import cn from 'classnames';

const CheckGender = ({ gender, onInput }) => {
  return (
    <div className='check_box'>
      <span className='check_sex'>
        <Button
          type='button'
          name='gender'
          value='M'
          className={cn({ checked: gender === 'M' })}
          onClick={onInput}
          content='남'
        />
      </span>
      <span className='check_sex'>
        <Button
          type='button'
          name='gender'
          value='W'
          className={cn({ checked: gender === 'W' })}
          onClick={onInput}
          content='여'
        />
      </span>
    </div>
  );
};

export default CheckGender;
