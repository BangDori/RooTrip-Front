import React, { useCallback } from 'react';
import '@styles/register/register.scss';
import cn from 'classnames';
import Input from '@components/Input';
import Button from '@components/Button';
import { useInitialState } from '@hooks/useInitialState';
import { regExpSpace } from '@constants/regExp';
import RegisterButton from './RegisterButton';
import RegisterEmailAuth from './RegisterEmailAuth';
import useValidateForm from '@hooks/useValidateForm';
import { showError } from '@utils/change';

const RegisterForm = ({ onRegister }) => {
  const [form, setForm, resetForm] = useInitialState({
    name: '',
    gender: 'M',
    email: '',
    nickname: '',
    password: '',
    password2: '',
  });
  const [validation, setValidation, validateForm] = useValidateForm({
    name: false,
    email: false,
    nickname: false,
    password: false,
    password2: false,
  });

  const onInput = useCallback(
    (e) => {
      if (!regExpSpace.test(e.target.value)) {
        setForm((form) => ({
          ...form,
          [e.target.name]: e.target.value,
        }));
      }
    },
    [setForm],
  );

  const confirmPassword = useCallback(
    (e) => {
      const prevPassword = document.querySelector('.password').value;
      const isConfirm = prevPassword === e.target.value;

      setValidation((validation) => ({
        ...validation,
        password2: isConfirm,
      }));
    },
    [setValidation],
  );

  const handleSubmit = useCallback(
    async (e) => {
      // 페이지 이동 막기
      e.preventDefault();

      const list = Object.keys(validation);
      const isValid = Object.values(validation);

      // 유효성 검사에 만족하지 못한게 하나라도 있다면,
      if (isValid.includes(false)) {
        const key = isValid.indexOf(false);

        alert(showError(list[key]));
        return;
      }

      try {
        // 상위 컴포넌트로 회원가입 정보 전달
        await onRegister(form);

        // form 상태 초기화
        resetForm();
      } catch (e) {
        console.log(e);
      }
    },
    [onRegister, validation, form, resetForm],
  );

  return (
    <form className='User_data' onSubmit={handleSubmit}>
      <div className='User_data_content'>
        <div className='input-register_form'>
          <Input
            name='name'
            value={form.name}
            onChange={onInput}
            onBlur={validateForm}
            placeholder='이름을 입력해주세요'
          />
          <div className='check_box'>
            <span className='check_sex'>
              <Button
                type='button'
                name='gender'
                value='M'
                className={cn({ checked: form.gender === 'M' })}
                onClick={onInput}
                content='남'
              />
            </span>
            <span className='check_sex'>
              <Button
                type='button'
                name='gender'
                value='W'
                className={cn({ checked: form.gender === 'W' })}
                onClick={onInput}
                content='여'
              />
            </span>
          </div>
        </div>
        <RegisterEmailAuth
          email={form.email}
          onInput={onInput}
          setValidation={setValidation}
        />
        <div className='input-register_form'>
          <Input
            name='nickname'
            value={form.nickname}
            onChange={onInput}
            onBlur={validateForm}
            placeholder='닉네임을 입력해주세요'
            message='※ 한글, 영어, 숫자를 조합한 닉네임을 입력해주세요.'
          />
        </div>
        <div className='input-register_form'>
          <Input
            className='password'
            name='password'
            value={form.password}
            onChange={onInput}
            onBlur={validateForm}
            placeholder='비밀번호를 입력해주세요'
            message='※ 숫자, 영어, 특수문자를 포함해 8~16자리로 입력해주세요.'
          />
        </div>
        <div className='input-register_form'>
          <Input
            className='password2'
            name='password2'
            value={form.password2}
            onChange={onInput}
            onBlur={confirmPassword}
            placeholder='비밀번호를 한번 더 입력해주세요'
            message='※ 위 입력한 비밀번호를 다시 입력해주세요.'
          />
        </div>
      </div>

      <RegisterButton />
    </form>
  );
};

export default RegisterForm;