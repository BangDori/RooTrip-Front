import { useEffect } from 'react';

/**
 * 페이지를 벗어날 때 경고창을 표시해주는 함수
 * @returns beforeunload add, remove 함수
 */
const usePreventLeave = (isDirty) => {
  const listener = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const enablePrevent = () => {
    window.addEventListener('beforeunload', listener);
  };

  const disablePrevent = () => {
    window.removeEventListener('beforeunload', listener);
  };

  useEffect(() => {
    if (isDirty) enablePrevent();
    else disablePrevent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return null;
};

export default usePreventLeave;
