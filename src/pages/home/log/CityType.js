import React, { useState, useCallback, useEffect } from 'react';

const LocationType = ({ item, setCheckSelected, handleCityClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClickHandler = useCallback(() => {
    setIsSelected((prevSelected) => !prevSelected);
  }, []);
  return (
    <button
      className='cityNames'
      style={{ background: isSelected ? '#777777' : 'white' }}
      onClick={() => {
        handleCityClick(item);
        onClickHandler();
      }}
    >
      {item.name}
    </button>
  );
};

export default LocationType;
