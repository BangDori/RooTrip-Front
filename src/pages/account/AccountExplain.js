import React from 'react';
import styled from 'styled-components';

const StyledAccountExplain = styled.div`
  text-align: center;
  margin-bottom: 75px;
`;

const FindExplain = ({ children }) => (
  <StyledAccountExplain>
    <h2>{children}</h2>
  </StyledAccountExplain>
);

export default FindExplain;
