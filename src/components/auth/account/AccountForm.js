import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { regExpEmail } from '@constants/regular-expression';
import useVerify from '@hooks/useVerify';
import usePreventLeave from '@hooks/usePreventLeave';

const AccountForm = ({ error, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
    setError,
    setFocus,
  } = useForm({ mode: 'onBlur' });

  const { timer, isSend, sendCount, sendCode, isStopped } = useVerify();
  const submit = useSubmit();
  const notify = (message) => toast(`🦄 ${message}`);

  usePreventLeave(isDirty);

  useEffect(() => setFocus('email'), [setFocus]);

  const onSendVerifyCode = async () => {
    const email = getValues('email');

    if (!regExpEmail.test(email)) {
      setError('email', { message: '※ 이메일 형식이 올바르지 않습니다.' });
      setFocus('email');
      return;
    }

    await sendCode(email, notify);
  };

  const onSubmit = (accountForm) => {
    if (isStopped) {
      setError('verifyNumber', { message: '※ 인증시간이 만료되었습니다.' });
      return;
    }

    submit(accountForm, { method: 'POST' });
    notify('초기화된 비밀번호가 전송되었습니다.');
  };

  return (
    <form
      method='post'
      className='account-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='input-container'>
        <div className='with-button'>
          <input
            type='text'
            name='email'
            placeholder='이메일 (test@test.com)'
            {...register('email', {
              required: '※ 필수 항목 입니다.',
            })}
            disabled={isSend}
          />
          <button
            className={`send-button ${sendCount === 0 && 'disabled'}`}
            type='button'
            onClick={onSendVerifyCode}
            disabled={sendCount === 0}
          >
            {!isSend && '전송'}
            {isSend && '재전송'}
          </button>
        </div>
        <ErrorMessage
          errors={errors}
          name='email'
          render={({ message }) => <p className='error-message'>{message}</p>}
        />
      </div>
      <div className='input-container'>
        <div className='with-button'>
          <input
            className={!isSend ? 'disabled' : undefined}
            type='text'
            placeholder='인증번호'
            {...register('verifyNumber', {
              required: '※ 필수 항목 입니다.',
              minLength: 1,
              maxLength: 6,
            })}
            disabled={!isSend}
          />
          {isSend && <p className='timer'>{timer}</p>}
        </div>
        <ErrorMessage
          errors={errors}
          name='verifyNumber'
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
        {!isSubmitting && '비밀번호 초기화'}
      </button>
      {error && <p className='fetch-error-message'>{error.message}</p>}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />{' '}
    </form>
  );
};

export default AccountForm;
