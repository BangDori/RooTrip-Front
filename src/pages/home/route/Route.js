import React, { useCallback, useState } from 'react';

import '@styles/home/route.scss';

const cities = [
  {
    id: 1,
    name: '서울',
    isSelected: false,
  },
  {
    id: 2,
    name: '강원도',
    isSelected: false,
  },
  {
    id: 3,
    name: '충청북도',
    isSelected: false,
  },
  {
    id: 4,
    name: '인천',
    isSelected: false,
  },
  {
    id: 5,
    name: '대구',
    isSelected: false,
  },
  {
    id: 6,
    name: '경상북도',
    isSelected: false,
  },
  {
    id: 7,
    name: '경상남도',
    isSelected: false,
  },
  {
    id: 8,
    name: '대전',
    isSelected: false,
  },
  {
    id: 9,
    name: '전라북도',
    isSelected: false,
  },
  {
    id: 10,
    name: '광주',
    isSelected: false,
  },
  {
    id: 11,
    name: '부산',
    isSelected: false,
  },
  {
    id: 12,
    name: '울산',
    isSelected: false,
  },
  {
    id: 13,
    name: '제주도',
    isSelected: false,
  },
];

const Route = () => {
  const [isAddCity, setIsAddCity] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchCity, setSearchCity] = useState([]);

  const onClickAddCityHandler = useCallback(() => {
    setIsAddCity((prevState) => !prevState);
  }, []);

  const onClickSearchCityHandler = useCallback((e) => {
    setSearchCity((prev) => [...prev, e.target.name]);
  }, []);

  const onClickSearchHandler = useCallback(() => {
    setIsSearch(true);
  }, []);

  return (
    <div className='route-content'>
      <div className='route-search-header'>
        <div className='route-search-bar'>
          <div className='route-search-title'>
            <h3>지 역</h3>
          </div>
          <div className='route-search-box'>
            <div className='route-search-city'>
              {searchCity.map((city) => `${city} `)}
            </div>
            <button className='route-search-button'>검색</button>
          </div>
        </div>
        <div className={`route-search-selectBox ${isAddCity ? 'open' : ''}`}>
          <div className='select-city-name'>
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={onClickSearchCityHandler}
                name={city.name}
                // style={{ background: }}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
        <div className='route-search-option'>
          <button onClick={onClickAddCityHandler}>
            {isAddCity ? (
              <svg
                width='14'
                height='12'
                viewBox='0 0 14 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M7 0L0.0717964 12L13.9282 12L7 0Z' fill='#D9D9D9' />
              </svg>
            ) : (
              <svg
                width='14'
                height='12'
                viewBox='0 0 14 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M7 12L13.9282 0H0.0717969L7 12Z' fill='#D9D9D9' />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Route;
