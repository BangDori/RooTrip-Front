import React, { useState, useCallback, useEffect } from 'react';

const MiddleThemeType = ({ handleMiddleClick, item }) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClickHandler = useCallback(() => {
    setIsSelected((prevSelected) => !prevSelected);
  }, []);
  return (
    <button
      className='themeNames'
      style={{ background: isSelected ? '#777777' : 'white' }}
      onClick={() => {
        handleMiddleClick(item);
        onClickHandler();
      }}
    >
      {item.name}
    </button>
  );
};

export default MiddleThemeType;
