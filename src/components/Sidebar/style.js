import styled from 'styled-components';

export const Container = styled.div`
  background-color: #242C48;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 37%;
  left: ${props => props.sidebar ? '0' : '-100%'};
  animation: showSidebar .4s;
  z-index: 2;
  display: flex;
  justify-content: flex-end;

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 37%;
    }
  }
`;

export const Content = styled.div`
  margin-top: 100px;
  display: flex;

`;

export const OpacityContainer = styled.div`
width: 100vw;
height: 100%;
background-color: rgba(18, 20, 31, 0.6);
z-index: 555;
position: absolute;
z-index: 2;
top: 0;
right: 0;
min-height: 100vh;
`