import { useEffect } from 'react';
import { useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import BeatLoader from 'react-spinners/BeatLoader';

import '@styles/root/login/LoginForm.scss';
import '@styles/spinner/BeatSpinner.scss';

const LoginForm = ({ error, isSubmitting }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
    setError,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const submit = useSubmit();

  useEffect(() => {
    if (error) {
      setFocus('email');
      reset();
      setError('email', { message: error.message });
    }
  }, [setFocus, setError, reset, error]);

  useEffect(() => setFocus('email'), [setFocus]);

  const onLocalLogin = (authForm) => submit(authForm, { method: 'post' });

  return (
    <form className='login-form' onSubmit={handleSubmit(onLocalLogin)}>
      <input
        id='email'
        type='text'
        placeholder='사용자 이메일'
        {...register('email', {
          required: '이메일 정보를 입력해주세요.',
        })}
      />
      <input
        type='password'
        placeholder='비밀번호'
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
        })}
      />
      <button className='login-button' type='submit' disabled={isSubmitting}>
        {isSubmitting && (
          <BeatLoader
            className='beat-spinner'
            color='#ffff'
            size='5'
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        )}
        {!isSubmitting && '로그인'}
      </button>

      <ErrorMessage
        errors={errors}
        name={Object.keys(errors)[0]}
        render={({ message }) => <p className='error-message'>{message}</p>}
      />
    </form>
  );
};

export default LoginForm;
