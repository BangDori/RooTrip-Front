import React from 'react';

const Input = ({ type, className, ...attr }) => (
  <>
    <input type={type || 'text'} className={className} {...attr} />
  </>
);

export default Input;
