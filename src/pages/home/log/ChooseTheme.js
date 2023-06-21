import { useState } from 'react';

import Modal from '@components/wrapper/Modal';
import ModalLocation from './ModalLocation';
import ModalTheme from './ModalTheme';
import Search from './Search';

const ChooseTheme = () => {
  const [clickChoose, setClickChoose] = useState(false);
  const [clickChooseLocation, setClickChooseLocation] = useState(false);
  const [clickChooseTheme, setClickChooseTheme] = useState(false);
  const [cityTemp, setCityTemp] = useState(null);
  const [smallCityTemp, setSmallCityTemp] = useState({ code: null });
  const [bigThemeTemp, setBigThemeTemp] = useState({ code: null });
  const [middleThemeTemp, setMiddleThemeTemp] = useState({ code: null });
  const [smallThemeTemp, setSmallThemeTemp] = useState({ code: null });
  const [clickSearch, setClickSearch] = useState(false);

  const openModalLocation = () => {
    setClickChooseLocation(true);
    setClickChoose(true);
  };

  const openModalTheme = () => {
    setClickChooseTheme(true);
    setClickChoose(true);
  };

  const closeModal = () => {
    setClickChooseLocation(false);
    setClickChooseTheme(false);
    setClickChoose(false);
  };

  const SearchTourism = () => {
    if (cityTemp != null || bigThemeTemp.code != null) {
      setClickSearch(true);
      // eslint-disable-next-line no-console
      console.log('hi');
    }
  };

  return (
    <div className='log-content'>
      <div className='content'>
        <div className='title'>
          <span>실시간 인기 명소</span>
        </div>
        <div className='chooseBox'>
          <div className='chooseLocation'>
            <span>지역</span>
            {cityTemp != null ? (
              <span className='cityName'>{cityTemp.name}</span>
            ) : (
              ''
            )}
            <button
              className='buttonLocation'
              type='button'
              onClick={openModalLocation}
            >
              선택
            </button>
          </div>
          <div className='chooseTheme'>
            <span>테마</span>
            {bigThemeTemp.code != null &&
            middleThemeTemp.code != null &&
            smallThemeTemp.code != null ? (
              <span className='themeNames'>
                대분류 : {bigThemeTemp.name}, 중분류 : {middleThemeTemp.name},
                소분류 : {smallThemeTemp.name}
              </span>
            ) : (
              ''
            )}
            <button
              className='buttonLocation'
              type='button'
              onClick={openModalTheme}
            >
              선택
            </button>
          </div>
        </div>
        <div className='searchBox'>
          <button
            className='searchButton'
            type='button'
            onClick={SearchTourism}
          >
            검색
          </button>
        </div>
        <div className='showBox'>
          {clickSearch && (
            <Search
              cityTemp={cityTemp}
              smallCityTemp={smallCityTemp}
              bigThemeTemp={bigThemeTemp}
              middleThemeTemp={middleThemeTemp}
              smallThemeTemp={smallThemeTemp}
            />
          )}
        </div>
      </div>
      {clickChoose && (
        <Modal>
          {clickChooseLocation ? (
            <ModalLocation
              closeModal={closeModal}
              cityTemp={cityTemp}
              setCityTemp={setCityTemp}
              smallCityTemp={smallCityTemp}
              setSmallCityTemp={setSmallCityTemp}
            />
          ) : (
            <ModalTheme
              closeModal={closeModal}
              setBigThemeTemp={setBigThemeTemp}
              bigThemeTemp={bigThemeTemp}
              middleThemeTemp={middleThemeTemp}
              setMiddleThemeTemp={setMiddleThemeTemp}
              setSmallThemeTemp={setSmallThemeTemp}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ChooseTheme;
