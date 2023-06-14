import { useCallback } from 'react';
import { likedArticle } from '@services/auth';

const LikedTrip = ({ accessToken }) => {
  const onLikedArticle = useCallback(async () => {
    try {
      const likedArticleToken = await likedArticle(accessToken);
    } catch (e) {
      alert('좋아요 게시글 가져오기 실패!');
    }
  }, [accessToken]);
  return (
    <>
      <div className='likedTripBox'>
        <div className='tripTitle'>
          <h2>내가 좋아한 여행</h2>
          <span>마음에 든 여행을 저장하세요</span>
          <button type='button' onClick={onLikedArticle}>
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

export default LikedTrip;
