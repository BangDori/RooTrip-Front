import { useEffect } from 'react';
import { useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { BeatLoader } from 'react-spinners';

import {
  regExpName,
  regExpEmail,
  regExpPassword,
  regExpNickname,
} from '@constants/regular-expression';
import usePreventLeave from '@hooks/usePreventLeave';

const SignUpForm = ({ error, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    reset,
    setFocus,
    getValues,
  } = useForm({
    mode: 'onBlur',
  });
  const submit = useSubmit();

  usePreventLeave(isDirty);

  useEffect(() => setFocus('email'), [setFocus]);

  useEffect(() => {
    if (error) {
      setFocus('email');
      reset((prevForm) => ({ ...prevForm, email: '' }));
      setError('email', { message: error.message });
    }
  }, [setFocus, setError, reset, error]);

  const onSignUp = (signupForm) => submit(signupForm, { method: 'post' });

  const onSuccessEmail = regExpEmail.test(getValues('email'))
    ? 'input-success'
    : undefined;
  const onSuccessName = regExpName.test(getValues('name'))
    ? 'input-success'
    : undefined;
  const onSuccessNickname =
    regExpNickname.test(getValues('nickname')) && !errors.nickname
      ? 'input-success'
      : undefined;
  const onSuccessPassword = regExpPassword.test(getValues('password'))
    ? 'input-success'
    : undefined;

  return (
    <form
      method='post'
      className='signup-form'
      onSubmit={handleSubmit(onSignUp)}
    >
      <div className='input-container'>
        <input
          type='text'
          placeholder='이메일 (test@test.com)'
          className={onSuccessEmail}
          {...register('email', {
            required: '※ 필수 항목 입니다.',
            pattern: {
              value: regExpEmail,
              message: '※ 이메일이 올바르지 않습니다.',
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name='email'
          render={({ message }) => <p className='error-message'>{message}</p>}
        />
      </div>
      <div className='input-container'>
        <input
          type='text'
          placeholder='이름을 입력해주세요.'
          className={onSuccessName}
          {...register('name', {
            required: '※ 필수 항목 입니다.',
            pattern: {
              value: regExpName,
              message: '※ 2자 이상의 한글 이름을 입력해주세요.',
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name='name'
          render={({ message }) => <p className='error-message'>{message}</p>}
        />
      </div>
      <div className='input-container'>
        <input
          type='text'
          placeholder='닉네임을 입력해주세요.'
          className={onSuccessNickname}
          {...register('nickname', {
            required: '※ 필수 항목 입니다.',
            pattern: {
              value: regExpNickname,
              message: '※ 2~8자 이내의 닉네임을 입력해주세요.',
            },
          })}
        />

        <ErrorMessage
          errors={errors}
          name='nickname'
          render={({ message }) => <p className='error-message'>{message}</p>}
        />
      </div>
      <div className='input-container'>
        <input
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          className={onSuccessPassword}
          {...register('password', {
            required: '※ 필수 항목 입니다.',
            pattern: {
              value: regExpPassword,
              message:
                '※ 비밀번호는 8~16자 사이, 영문, 숫자, 특수문자($@$!%*?&)를 모두 포함해야 합니다.',
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name='password'
          render={({ message }) => <p className='error-message'>{message}</p>}
        />
      </div>

      <button className='submit-button' type='submit' disabled={isSubmitting}>
        {isSubmitting && (
          <BeatLoader
            className='beat-spinner'
            color='#ffff'
            size='5'
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        )}
        {!isSubmitting && '가입하기'}
      </button>
    </form>
  );
};

export default SignUpForm;
