import { styled } from "..";

export const NavMenuContainer = styled("div", {
  background: "$red",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "space-evenly",
  padding: "15px",
  width: "37%",
  position:"absolute",
  top:0,
  left:0,
  ".logo-box": {
    display: "flex",
    alignItems: "center",
  },
  ".img-logo": {
    width: "150px",
  },
  ".img-logo img": {
    width: "100%",
    height: "100%",
  },
  ".recurses-box":{
    height:'73%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',


  }
});
