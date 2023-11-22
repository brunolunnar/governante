import { styled } from "..";

export const HeaderContainer = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "30px 10px",
  
  "#menu": {
    background: "$blue",
  },
  a: {
    fontSize: "25px",
    cursor: "pointer",
    textDecoration:'none',
    listStyle:'none',
    color:"$white"
  },
  ".header-box": {
    display: "none",
    gap: "3rem",
  },
  ".logo": {
    width: "12%",
    height: "auto",
    cursor: "pointer",
  },
  ".menu": {
    cursor: "pointer",
  },
  "@media(min-width:768px)":{
    '.header-box':{
      display:'flex'
    }     
  }
});
