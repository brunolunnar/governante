import { styled } from "..";

export const LoadingContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection:'column',
  marginTop:'3rem',
  ".loading-box": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position:'relative',
  },
  ".svg": {
    width: "50px",
    position:'absolute',
    position:'absolute',
    top:'-7px',
    right:'-54'

  },
  ".logo-box":{
    display:'flex',
    flexDirection:'column'
  }
});
