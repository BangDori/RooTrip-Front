import React from 'react';
import '@styles/register/register.scss';

const Checkbox = ({ name, checked, onChange, children }) => {
  return (
    <label>
      <input
        name={name}
        type='checkbox'
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default React.memo(Checkbox);
