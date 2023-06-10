import React, { useState, useCallback, useEffect } from 'react';

const BigThemeType = ({ handleBigClick, item, setCheckSelected }) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClickHandler = useCallback(() => {
    setIsSelected((prevSelected) => !prevSelected);
  }, []);
  return (
    <button
      className='themeNames'
      style={{ background: isSelected ? '#777777' : 'white' }}
      onClick={() => {
        handleBigClick(item);
        onClickHandler();
      }}
    >
      {item.name}
    </button>
  );
};
export default BigThemeType;
