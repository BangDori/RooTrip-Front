import React, { useState, useCallback, useEffect } from 'react';
import '@styles/components/modalChooseLocation.scss';
import CityType from './CityType';
import SmallCityType from './SmallCityType';

const ModalLocation = ({
  closeModal,
  cityTemp,
  smallCityTemp,
  setCityTemp,
  setSmallCityTemp,
}) => {
  const [cityData, setCityData] = useState(null);
  const [smallCityData, setSmallCityData] = useState(null);
  const [checkSelected, setCheckSelected] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const onClickHandler = useCallback(() => {
    setIsSelected((prevSelected) => !prevSelected);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=fj89xEX4jKk9mI39GALZWh4r7r%2Bl46iciXx0MOPKSv7ksqrCfg3BO17CfSmt9iE6LscgSQpDAhGvog9h1nIrXg%3D%3D&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json',
        );
        const json = await response.json();
        const items = json.response.body.items.item;
        if (Array.isArray(items)) {
          setCityData(items);
        }
      } catch (error) {
        alert('error');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (checkSelected && cityTemp) {
        try {
          const response2 = await fetch(
            `http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=fj89xEX4jKk9mI39GALZWh4r7r%2Bl46iciXx0MOPKSv7ksqrCfg3BO17CfSmt9iE6LscgSQpDAhGvog9h1nIrXg%3D%3D&areaCode=${cityTemp.code}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`,
          );
          const json = await response2.json();
          const items = json.response.body.items.item;
          if (Array.isArray(items)) {
            setSmallCityData(items);
          }
        } catch (error) {
          alert('error');
        }
      }
    };

    fetchData();
  }, [checkSelected, cityTemp]);

  const handleCityClick = useCallback(
    (selectedCity) => {
      setCheckSelected(true);
      setCityTemp(selectedCity);
    },
    [setCityTemp],
  );

  return (
    <>
      <div className='modalChooseLoaction'>
        <div className='title'>
          <span>지역 선택</span>
          <button type='button' onClick={closeModal}>
            x
          </button>
        </div>
        <div className='modalContent'>
          <div className='wideLocation'>
            <div className='wideTitle'>
              <span className='wideTitleTxt'>광역시 / 도</span>
            </div>
            {Array.isArray(cityData) && (
              <div className='locationDetails'>
                {cityData.map((item) => (
                  <CityType
                    key={item.code}
                    item={item}
                    handleCityClick={handleCityClick}
                  />
                ))}
              </div>
            )}
          </div>
          <div className='smallLocation'>
            <div className='smallTitle'>
              <span className='smallTitleTxt'>시 / 군 / 구</span>
            </div>
            {Array.isArray(smallCityData) && (
              <div className='locationDetails'>
                <button
                  className='smallCityNames'
                  onClick={onClickHandler}
                  style={{ background: isSelected ? '#777777' : 'white' }}
                >
                  전체
                </button>
                {smallCityData.map((item) => (
                  <SmallCityType key={item.code} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
        <footer>
          <button type='button' onClick={closeModal}>
            완료
          </button>
        </footer>
      </div>
    </>
  );
};

export default ModalLocation;
