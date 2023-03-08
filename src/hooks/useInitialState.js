import { useState } from 'react';

export const useInitialState = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const resetState = () => {
    setState(initialValue);
  };

  return [state, setState, resetState];
};
