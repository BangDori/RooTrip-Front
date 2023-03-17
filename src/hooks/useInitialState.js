import { useCallback, useState } from 'react';

export const useInitialState = (initialValue) => {
  const [form, setForm] = useState(initialValue);

  const resetForm = useCallback(() => {
    setForm(initialValue);
  }, [initialValue]);

  return [form, setForm, resetForm];
};
