import React, { useCallback, useState } from 'react';

const City = ({ addSearchCity, city, isMax }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { name } = city;

  const onClickHandler = useCallback(() => {
    if (isMax && !isSelected) {
      alert('최대 3개 선택');
      return;
    }

    setIsSelected((prevSelected) => !prevSelected);
    addSearchCity(name);
  }, [addSearchCity, name, isMax, isSelected]);

  return (
    <button
      onClick={onClickHandler}
      style={{ background: isSelected ? '#777777' : '#ccc' }}
    >
      {name}
    </button>
  );
};

export default City;
