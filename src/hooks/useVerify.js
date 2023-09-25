import { useState } from 'react';
import { useTimer } from 'use-timer';

import { sendVerifyNumberAPI } from '@services/email';

const useVerify = () => {
  const {
    time,
    start,
    reset: resetTimer,
    status,
  } = useTimer({
    initialTime: 180,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  const [isSend, setIsSend] = useState(false);
  const [sendCount, setSendCount] = useState(4);

  const isStopped = status === 'STOPPED';

  const timer = `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;

  const sendCode = async (email, notify) => {
    if (sendCount <= 0) {
      notify('인증번호 전송 횟수를 초과하였습니다.');
      return;
    }

    let message = '인증번호가 전송되었습니다.';

    if (sendCount <= 3) {
      resetTimer();
      start();
      message = '인증번호가 재전송되었습니다.';
    }

    const response = await sendVerifyNumberAPI(email);
    const resData = await response.json();

    if (!resData.status) {
      notify('이메일 인증에 실패하였습니다. 다시 시도해주세요.');
      return;
    }

    notify(message);
    start();
    setIsSend(true);
    setSendCount((prevCount) => prevCount - 1);
  };

  return {
    timer,
    isSend,
    sendCount,
    sendCode,
    isStopped,
  };
};

export default useVerify;
