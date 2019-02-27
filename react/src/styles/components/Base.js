import styled from 'styled-components';

export const StyledAPILink = styled.div`
  margin-top: 10px;
  font-size: 12pt;
  transition: all .1s ease;
  padding-left: 10px;

  &:hover {
    cursor: pointer;
    border-left: 5px solid crimson;
    transition: all .1s ease;
  }
`;

export const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const StyledAPIData = styled.div`
  width: 90vw;
  padding-left: 30px;
  padding-top: 30px;
  overflow-y: scroll;
`;
