import React from 'react';

const Button = ({
  type,
  name,
  value,
  className,
  onClick,
  content,
  ...attribute
}) => (
  <button
    type={type}
    name={name}
    value={value}
    className={className}
    onClick={onClick}
    {...attribute}
  >
    {content}
  </button>
);

export default React.memo(Button);
