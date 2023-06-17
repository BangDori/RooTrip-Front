import { useState, useCallback } from 'react';

const SmallCityType = ({ item }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClickHandler = useCallback(() => {
    setIsSelected((prevSelected) => !prevSelected);
  }, []);

  return (
    <button
      className='smallCityNames'
      style={{ background: isSelected ? '#777777' : 'white' }}
      onClick={onClickHandler}
    >
      {item.name}
    </button>
  );
};

export default SmallCityType;
