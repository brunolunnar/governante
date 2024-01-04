import { styled } from "..";

export const LoaderContainer = styled("div", {

  ".loader-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: 'fixed',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    background: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: '920',
    
  },
  ".loader-container.on": {
    opacity:'0.5'
  },
  ".loader-container.off": {
    opacity:'0.0',
    pointerEvents:'none',
    transition:'all ease-in-out 0.3s',
  }
});
