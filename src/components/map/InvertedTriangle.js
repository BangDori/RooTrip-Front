import React from 'react';

const InvertedTriangle = ({ isShow }) => {
  if (!isShow) return null;

  return (
    <svg viewBox={'0 0 46 50'} width={30} height={50}>
      <polygon points='46,0 23,50 0,0' fill={'#cccccc'} />
    </svg>
  );
};
export default InvertedTriangle;
