import { useCallback } from 'react';
import { myTripArticle } from '@services/auth';

const MyTrip = ({ accessToken }) => {
  const onMyTripArticle = useCallback(async () => {
    try {
      const myTripArticleToken = await myTripArticle(accessToken);
      console.log(myTripArticleToken);
    } catch (e) {
      alert('저장된 게시글 가져오기 실패!');
    }
  }, [accessToken]);
  return (
    <>
      <div className='myTripBox'>
        <div className='tripTitle'>
          <h2>나의 게시물</h2>
          <span>자신의 게시물을 기록해 보세요</span>
          <button type='button' onClick={onMyTripArticle}>
            여행 가져오기
          </button>
        </div>
        <div className='tripContent'>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
          <div className='article'></div>
        </div>
      </div>
    </>
  );
};

export default MyTrip;
