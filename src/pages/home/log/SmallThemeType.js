import { useState, useCallback } from 'react';

const SmallThemeType = ({ handleSmallClick, item }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClickHandler = useCallback(() => {
    setIsSelected((prevSelected) => !prevSelected);
  }, []);

  return (
    <button
      className='themeNames'
      style={{ background: isSelected ? '#777777' : 'white' }}
      onClick={() => {
        handleSmallClick(item);
        onClickHandler();
      }}
    >
      {item.name}
    </button>
  );
};

export default SmallThemeType;
