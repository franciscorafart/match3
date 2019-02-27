import styled from 'styled-components';

export const StyledSideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100vh;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.2);
`;

export const StyledSideBarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: whitesmoke;
  background-color: #2d383a;
  border-bottom: 5px solid crimson;

  h1 {
    margin: 0;
    font-size: 36pt;
  }
`;

export const StyledSideBarBody = styled.div`
  padding-left: 10px
`;
