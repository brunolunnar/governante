import { styled } from "..";

export const LoginContainer = styled("section", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "4rem",
  
  img: {
    width: "80%",
    height: "auto",
  },
  button: {
    background: "$branch",
    color: "$white",
    padding: "20px",
    borderRadius: "34px",
  },
  "@media(min-width:768px)": {
    fontSize: 22,
    img: {
      width: "60%",
    },
    button: {
      padding: "23px",
    },
  },
  "@media(min-width:1024px)": {
    fontSize: 25,
    img: {
      width: "38%",
      marginBottom:'50px'
    },
    button: {
      borderRadius: 54,
      height: "87px",
      width: " 423px",
    },
  },
});
