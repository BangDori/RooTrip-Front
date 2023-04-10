import { useCallback, useState } from 'react';
import validate from '@utils/validation';

const useValidateForm = (intialState) => {
  const [validation, setValidation] = useState(intialState);

  const validateForm = useCallback(async (e) => {
    const { isValid, type } = await validate(e.target.name, e.target.value);

    setValidation((prevValidation) => ({
      ...prevValidation,
      [type]: isValid,
    }));
  }, []);

  return [validation, setValidation, validateForm];
};

export default useValidateForm;
