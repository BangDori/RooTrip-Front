import React from 'react';

const Button = ({ type, className, children, ...attr }) => (
  <button type={type || 'button'} className={className} {...attr}>
    {children}
  </button>
);

export default Button;
