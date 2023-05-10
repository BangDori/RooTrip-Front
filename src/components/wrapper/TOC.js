import React from 'react';
import styled from 'styled-components';

const StyledTOC = styled.div`
  float: left;
  width: 38%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-right: 2px solid black;
  padding-right: 30px;
  padding-top: 15px;

  span {
    font-size: 20px;
    margin-bottom: 46px;
  }

  .email_check {
    margin-bottom: 122px;
  }
`;

const TOC = ({ table }) => {
  return (
    <StyledTOC>
      {table.map((content) => (
        <span key={content.id} className={content.classname}>
          {content.name}
        </span>
      ))}
    </StyledTOC>
  );
};

export default TOC;
