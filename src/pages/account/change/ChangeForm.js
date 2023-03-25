import React, { useCallback, useState } from 'react';
import Input from '@components/Input';
import styled from 'styled-components';
import useValidateForm from '@hooks/useValidateForm';
import { showError } from '@utils/change';

const StyledChangeForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px 0 0 30px;

  input {
    width: 285px;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 25px;
    font-size: 15px;
    padding-left: 15px;
    border: 1px solid #ccc;
    background-color: #efefef;
  }
  span {
    letter-spacing: -1px;
    margin: 15px;
    font-weight: bold;
  }

  .signbtn {
    margin-top: 30px;
    padding-left: 108px;

    .check_btn {
      cursor: pointer;
      background-color: rgb(72, 72, 196);
      color: white;
      font-size: 20px;
      font-weight: bold;
      border: 1px solid rgb(45, 45, 254);
      width: 150px;
      height: 50px;
      box-shadow: 4px 4px 2px 2px #ccc;
    }

`;

const ChangeForm = ({ onChange }) => {
  const [form, setForm] = useState({
    password: '',
    password2: '',
  });
  const [validation, setValidation, validateForm] = useValidateForm({
    password: false,
    password2: false,
  });
  const { password, password2 } = form;

  const onInput = useCallback((e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onCheck = useCallback(
    (e) => {
      const prevPassword = document.querySelector('.password').value;
      const isConfirm = prevPassword === e.target.value;

      setValidation((prevValidation) => ({
        ...prevValidation,
        [e.target.name]: isConfirm,
      }));
    },
    [setValidation],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const list = Object.keys(validation);
      const isValid = Object.values(validation);

      // 유효성 검사에 만족하지 못한게 하나라도 있다면,
      if (isValid.includes(false)) {
        const key = isValid.indexOf(false);

        console.log(key, list[key]);

        alert(showError(list[key]));
        return;
      }

      onChange(form.password);
    },
    [validation, form.password, onChange],
  );

  return (
    <StyledChangeForm onSubmit={handleSubmit}>
      <div className='input-register_form'>
        <Input
          className='password'
          type='password'
          name='password'
          value={password}
          onChange={onInput}
          onBlur={validateForm}
          placeholder='비밀번호를 입력해주세요'
          message='※ 숫자, 영어, 특수문자를 포함해 8~16자리로 입력해주세요.'
        />
      </div>
      <div className='input-register_form'>
        <Input
          className='password2'
          type='password'
          name='password2'
          value={password2}
          onChange={onInput}
          onBlur={onCheck}
          placeholder='비밀번호를 한번 더 입력해주세요'
          message='※ 위 입력한 비밀번호를 다시 입력해주세요.'
        />
      </div>
      <div className='signbtn'>
        <button type='submit' className='check_btn'>
          변경하기
        </button>
      </div>
    </StyledChangeForm>
  );
};

export default ChangeForm;
