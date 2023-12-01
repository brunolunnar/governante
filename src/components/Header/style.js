import { styled } from "@/styles";

export const Container = styled('div',{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "30px 10px",
  span:{
    fontWeight:100,
    color:'LightGray'
  },
  "#menu": {
    background: "$blue",
  },
  a: {
    fontSize: "1.3rem",
    cursor: "pointer",
    textDecoration:'none',
    listStyle:'none',
    color:"$white"
  },
  '.link:hover':{
    '&:hover , &:hover span':{
      color:'$blue'
    }
  },
  ".header-box": {
    display: "none",
  },
  ".logo": {
    width: "8rem",
    height: "4rem",
    cursor: "pointer",
  },
  ".menu": {
    cursor: "pointer",
  },
  "@media(min-width:768px)":{
    '.header-box':{
      display:'flex',
      gap: "6rem",
    }     
  }
})
;
