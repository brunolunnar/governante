import { styled } from "@stitches/react";

export const AulaInitialContianer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "2rem",
  h1: {
    fontSize: "2.3rem",
    margin: "1.2rem",
  },
  "#panel1a-header, #panel2a-header": {
    background: "$main",
    borderRadius: "34px",
    border: "solid 2px white",
    color: "$white",
    fontFamily: "$montserrat",
    fontSize: "27px",
    width: "100%",
  },
  "#box": {
    background: "rgba(255, 0, 0, 0)",
    borderRadius: "34px",
    border: "none",
    boxShadow: "none",
    width: "70%",
    margin: "2rem 0",
  },
  path: {
    color: "$white",
  },
  ".confirm-btn": {
    background: "$green",
    color: "$white",
    border: "2px solid $green",
    borderRadius: "34px",
    padding: "9px",
    fontSize: "22px",
    width: "80%",
    margin: "10px 0",
  },
  "button:hover": {
    border: "2px solid $white",
  },

  ".module-acordion": {
    border: "2px solid #4189A6 !important",
    color: "#4189A6 !important",
  },
  ".module-acordion path": {
    color: "$blue",
  },
  ".acordion-box": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "#panel1a-content":{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  }
});
export default AulaInitialContianer;
