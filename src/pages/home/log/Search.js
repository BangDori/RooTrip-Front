import React, { useState, useCallback, useEffect } from 'react';

const Search = ({
  cityTemp,
  smallCityTemp,
  bigThemeTemp,
  middleThemeTemp,
  smallThemeTemp,
}) => {
  const [tourismData, setTourismData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=fj89xEX4jKk9mI39GALZWh4r7r%2Bl46iciXx0MOPKSv7ksqrCfg3BO17CfSmt9iE6LscgSQpDAhGvog9h1nIrXg%3D%3D&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=${cityTemp.code}&cat1=${bigThemeTemp.code}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const items = json.response.body.items.item;
        if (Array.isArray(items)) {
          setTourismData(items);
        }
      } catch (error) {
        alert('error');
      }
    };
    fetchData();
  }, [bigThemeTemp.code, cityTemp.code, middleThemeTemp, smallThemeTemp]);
  return (
    <div>
      {Array.isArray(tourismData) && (
        <div className='showDetails'>
          {tourismData.map((item) => (
            <div className='showOne' key={item.contentid}>
              <div className='imgBox'>
                {item.firstimage != null ? (
                  <img src={item.firstimage} alt=''></img>
                ) : (
                  <img src={item.firstimage2} alt=''></img>
                )}
              </div>
              <span>{item.title}</span>
              {/* 추가적인 필드를 필요에 따라 렌더링 */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
