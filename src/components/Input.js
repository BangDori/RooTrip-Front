import React from 'react';

const Input = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type,
  checked,
  disabled,
  ...attribute
}) => {
  console.log(name, ' Input updated!');
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      checked={checked}
      disabled={disabled}
      {...attribute}
    />
  );
};

export default React.memo(Input);
