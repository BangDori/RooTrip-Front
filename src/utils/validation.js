import {
  regExpName,
  regExpEmail,
  regExpPassword,
  regExpNickname,
} from '@constants/regExp';
import { findOne } from '@services/user';
import {
  DUPLICATED_EMAIL_ERROR,
  DUPLICATED_NICKNAME_ERROR,
  INVALID_NAME_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_NICKNAME_ERROR,
  INVALID_PASSWORD_ERROR,
  UNKNOWN_ERROR,
} from '@constants/error';

// 데이터 이름
const NAME = 'name';
const EMAIL = 'email';
const NICKNAME = 'nickname';
const PASSWORD = 'password';

export async function validate(type, data) {
  let error = '';
  let isValid = true;

  switch (type) {
    case NAME:
      // 이름 유효성 검사
      if (!regExpName.test(data)) {
        isValid = false;
        error = INVALID_NAME_ERROR;
      }

      break;

    case EMAIL:
      // 이메일 유효성 검사
      if (!regExpEmail.test(data)) {
        isValid = false;
        error = INVALID_EMAIL_ERROR;
        break;
      }

      // 이메일 중복 검사
      if (!(await findOne(type, data))) {
        isValid = false;
        error = DUPLICATED_EMAIL_ERROR;
      }

      break;

    case NICKNAME:
      // 닉네임 유효성 검사
      if (!regExpNickname.test(data)) {
        isValid = false;
        error = INVALID_NICKNAME_ERROR;
      }

      // 닉네임 중복 검사
      if (!(await findOne(type, data))) {
        isValid = false;
        error = DUPLICATED_NICKNAME_ERROR;
      }

      break;

    case PASSWORD:
      // 비밀번호 유효성 검사
      if (!regExpPassword.test(data)) {
        isValid = false;
        error = INVALID_PASSWORD_ERROR;
      }

      break;

    default:
      isValid = false;
      error = UNKNOWN_ERROR;
      console.log(error);

      break;
  }

  return { isValid, error, type };
}
