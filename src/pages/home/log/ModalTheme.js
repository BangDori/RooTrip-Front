import React, { useState, useCallback, useEffect } from 'react';
import { parseString } from 'xml2js';
import '@styles/components/modalChooseTheme.scss';
import BigThemeType from './BigThemeType';
import MiddleThemeType from './MiddleThemeType';
import SmallThemeType from './SmallThemeType';

const ModalTheme = ({
  closeModal,
  bigThemeTemp,
  setBigThemeTemp,
  middleThemeTemp,
  setMiddleThemeTemp,
  setSmallThemeTemp,
}) => {
  const [data, setData] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [bigThemeData, setBigThemeData] = useState(null);
  const [middleThemeData, setMiddleThemeData] = useState(null);
  const [smallThemeData, setSmallThemeData] = useState(null);
  const [checkSelected, setCheckSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey=fj89xEX4jKk9mI39GALZWh4r7r%2Bl46iciXx0MOPKSv7ksqrCfg3BO17CfSmt9iE6LscgSQpDAhGvog9h1nIrXg%3D%3D&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json',
        );
        const json = await response.json();
        const items = json.response.body.items.item;
        if (Array.isArray(items)) {
          setBigThemeData(items);
        }
      } catch (error) {
        alert('error');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (checkSelected && bigThemeTemp) {
        try {
          const response2 = await fetch(
            `http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey=fj89xEX4jKk9mI39GALZWh4r7r%2Bl46iciXx0MOPKSv7ksqrCfg3BO17CfSmt9iE6LscgSQpDAhGvog9h1nIrXg%3D%3D&cat1=${bigThemeTemp.code}&numOfRows=15&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`,
          );
          const json = await response2.json();
          const items = json.response.body.items.item;
          // console.log(items);
          if (Array.isArray(items)) {
            setMiddleThemeData(items);
          }
        } catch (error) {
          alert('error');
        }
      }
    };

    fetchData();
  }, [bigThemeTemp, checkSelected]);

  useEffect(() => {
    const fetchData = async () => {
      if (checkSelected && middleThemeTemp && bigThemeTemp) {
        try {
          const response2 = await fetch(
            `http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey=fj89xEX4jKk9mI39GALZWh4r7r%2Bl46iciXx0MOPKSv7ksqrCfg3BO17CfSmt9iE6LscgSQpDAhGvog9h1nIrXg%3D%3D&cat1=${bigThemeTemp.code}&cat2=${middleThemeTemp.code}&numOfRows=15&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`,
          );
          const json = await response2.json();
          const items = json.response.body.items.item;
          if (Array.isArray(items)) {
            setSmallThemeData(items);
          }
        } catch (error) {
          alert('error');
        }
      }
    };

    fetchData();
  }, [bigThemeTemp, bigThemeTemp.code, checkSelected, middleThemeTemp]);

  const handleBigClick = useCallback(
    (selectedTheme) => {
      setCheckSelected(true);
      setBigThemeTemp(selectedTheme);
    },
    [setBigThemeTemp],
  );
  const handleMiddleClick = useCallback(
    (selectedTheme) => {
      setCheckSelected(true);
      setMiddleThemeTemp(selectedTheme);
    },
    [setMiddleThemeTemp],
  );
  const handleSmallClick = useCallback(
    (selectedTheme) => {
      setCheckSelected(true);
      setSmallThemeTemp(selectedTheme);
    },
    [setSmallThemeTemp],
  );
  return (
    <>
      <div className='modalChooseTheme'>
        <div className='title'>
          <span>테마 선택</span>
          <button type='button' onClick={closeModal}>
            x
          </button>
        </div>
        <div className='modalContent'>
          <div className='bigTheme'>
            <div className='title'>
              <span>대분류</span>
            </div>
            {Array.isArray(bigThemeData) && (
              <div className='themeDetails'>
                {bigThemeData.map((item) => (
                  <BigThemeType
                    key={item.code}
                    item={item}
                    handleBigClick={handleBigClick}
                  />
                ))}
              </div>
            )}
          </div>
          <div className='bigTheme'>
            <div className='title'>
              <span>중분류</span>
            </div>
            {Array.isArray(middleThemeData) && (
              <div className='themeDetails'>
                {middleThemeData.map((item) => (
                  <MiddleThemeType
                    key={item.code}
                    item={item}
                    handleMiddleClick={handleMiddleClick}
                  />
                ))}
              </div>
            )}
          </div>
          <div className='bigTheme'>
            <div className='title'>
              <span>소분류</span>
            </div>
            {Array.isArray(smallThemeData) && (
              <div className='themeDetails'>
                {smallThemeData.map((item) => (
                  <SmallThemeType
                    key={item.code}
                    item={item}
                    handleSmallClick={handleSmallClick}
                  />
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

export default ModalTheme;
