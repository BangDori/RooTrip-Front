import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import getRecommendPost from '@services/route';
import SearchItem from './SearchItem';
import City from './City';
import '@styles/home/route.scss';

const cities = [
  {
    id: 1,
    name: '서울',
  },
  {
    id: 2,
    name: '강원도',
  },
  {
    id: 3,
    name: '경기도',
  },
  {
    id: 4,
    name: '경상남도',
  },
  {
    id: 5,
    name: '경상북도',
  },
  {
    id: 6,
    name: '광주',
  },
  {
    id: 7,
    name: '대구',
  },
  {
    id: 8,
    name: '대전',
  },
  {
    id: 9,
    name: '부산',
  },
  {
    id: 10,
    name: '세종',
  },
  {
    id: 11,
    name: '울산',
  },
  {
    id: 12,
    name: '전라남도',
  },
  {
    id: 13,
    name: '전라북도',
  },
  {
    id: 14,
    name: '제주도',
  },
  {
    id: 15,
    name: '충청남도',
  },
  {
    id: 16,
    name: '충청북도',
  },
  {
    id: 17,
    name: '인천',
  },
];

const Route = () => {
  const [isAddCity, setIsAddCity] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchCity, setSearchCity] = useState([]);
  const { accessToken } = useSelector((state) => state.accessToken);
  const [searchList, setSearchList] = useState([]);
  const [message, setMessage] = useState('');

  const onClickAddCityHandler = useCallback(() => {
    setIsAddCity((prevState) => !prevState);
  }, []);

  const addSearchCityHandler = useCallback(
    (cityName) => {
      if (searchCity.includes(cityName)) {
        const updatedSearchCity = searchCity.filter(
          (city) => city !== cityName,
        );

        setSearchCity(updatedSearchCity);
      } else {
        setSearchCity((prevCities) => [...prevCities, cityName]);
      }
    },
    [searchCity],
  );

  const onClickSearchHandler = useCallback(async () => {
    if (searchCity.length === 0) {
      alert('하나 이상 정해주세요.');
      return;
    }
    setIsAddCity(false);
    setIsSearch(true);

    try {
      const data = await getRecommendPost(accessToken, searchCity);

      setSearchList(data);
      setMessage('');
    } catch (e) {
      setSearchList([]);
      setMessage(e.message);
    }
  }, [accessToken, searchCity]);

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
            <button
              className='route-search-button'
              onClick={onClickSearchHandler}
            >
              검색
            </button>
          </div>
        </div>
        <div className={`route-search-selectBox ${isAddCity ? 'open' : ''}`}>
          <div className='select-city-name'>
            {cities.map((city) => (
              <City
                key={city.id}
                city={city}
                addSearchCity={addSearchCityHandler}
                isMax={searchCity.length === 3}
              />
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
      <div className='route-search-list'>
        {searchList.map((item) => (
          <SearchItem key={item.id} item={item} />
        ))}
        {message && <p className='no-list-message'>{message}</p>}
      </div>
    </div>
  );
};

export default Route;
