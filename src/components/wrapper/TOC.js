import React from 'react';
import '@styles/components/TOC.scss';

const TOC = ({ table }) => {
  return (
    <div className='register-table'>
      {table.map((content) => (
        <span key={content.id} className={content.classname}>
          {content.name}
        </span>
      ))}
    </div>
  );
};

export default TOC;
