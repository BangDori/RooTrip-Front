import React from 'react';

const Input = ({
  boxName,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type,
  checked,
  disabled,
  message,
  ...attribute
}) => {
  console.log(name, ' Input update!');
  return (
    <div className={boxName}>
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
      {message && <span>{message}</span>}
    </div>
  );
};

export default React.memo(Input);
