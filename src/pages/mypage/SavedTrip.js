import { useCallback } from 'react';
import { savedArticle } from '@services/auth';

const SavedTrip = ({ accessToken }) => {
  const onSavedArticle = useCallback(async () => {
    try {
      const savedArticleToken = await savedArticle(accessToken);
      console.log(savedArticleToken);
    } catch (e) {
      alert('저장된 게시글 가져오기 실패!');
    }
  }, [accessToken]);
  return (
    <>
      <div className='savedTripBox'>
        <div className='tripTitle'>
          <h2>추천 받은 여행</h2>
          <span>Log를 통해 여행경로를 추천받아 보세요</span>
          <button type='button' onClick={onSavedArticle}>
            여행 가져오기
          </button>
        </div>
        <div className='tripContent'>
          <div className='recommended'>게시글 없음</div>
        </div>
      </div>
    </>
  );
};

export default SavedTrip;
