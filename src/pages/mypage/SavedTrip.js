import React from 'react';

const SavedTrip = () => {
  return (
    <>
      <div className='savedTripBox'>
        <div className='tripTitle'>
          <h2>추천 받은 여행</h2>
          <span>Log를 통해 여행경로를 추천받아 보세요</span>
        </div>
        <div className='tripContent'>
          <div className='recommended'>게시글 없음</div>
        </div>
      </div>
    </>
  );
};

export default SavedTrip;
