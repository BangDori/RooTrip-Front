import React from 'react';
import '../../styles/register/register.scss';

function Checkbox({ children, disabled, checked, onChange }) {
  return (
    <label>
      <input
        type='checkbox'
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {children}
    </label>
  );
}

export default Checkbox;
