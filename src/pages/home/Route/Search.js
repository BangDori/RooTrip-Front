import React, { useCallback, useState } from 'react';
import '@styles/home/Search.scss';
import Searchph from '@assets/search.png';
import questionmark from '@assets/questionmark.png';

const Search = () => {
  const [help, setHelp] = useState(false);
  const showhelp = useCallback(() => {
    setHelp(true);
  }, []);
  return (
    <div>
      <div className='search'>
        <input type='text' placeholder='검색어 입력해주세요' />
        <img src={Searchph} alt='돋보기' />
        <div className='questionmark'>
          <img src={questionmark} onClick={showhelp} alt='물음표' />
        </div>
        {help && (
          <div className='help_box'>
            <span>지역명을 입력해주세요</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
