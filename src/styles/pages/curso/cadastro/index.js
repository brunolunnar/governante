import { styled } from "@stitches/react";

export const CadastroCursoContainer = styled("section", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  h1: {
    fontSize: "3rem",
    marginTop: "2rem",
    fontWeight: "100",
  },

  form: {
    display: "flex",
    gap: "2rem",
    width: "80%",
    maxWidth: "60%",
    marginTop: "4rem",
    flexDirection:'column'
  },
  ".confirm-btn": {
    background: "$green",
    color: "$white",
    border: "1px solid $white",
    borderRadius: "34px",
    padding: "20px",
    fontSize: "26px",
    marginBottom: "2rem",
  },
  ".trilha": {
    display: "flex",
    justifyContent: "space-between",
    alignItems:'center'
  },
  input: {
    background: "$main",
    border: "2px $white ridge",
    padding: "14px",
    borderRadius: "2rem",
    fontFamily: "$montserrat",
    fontSize: "1.3rem",
  },
  "input::placeholder": {
    color: "white",
    border: "none",
  },
  "input:focus": {
    boxShadow: "0 0 0 0",
    outline: 0,
  },
  ".radio": {
    border: "3px solid #ccc",
    height: 37,
    width: '37%',
    position: "relative",
    borderRadius:'30px'
  },
  ".radio label": {
    background: "$main",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    whiteSpace: "nowrap",
    borderRadius:'25px',
    
  },
  ".radio span":{
    zIndex: "1"
  },
  ".radio label input[type=radio]": {
    all: "unset",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius:'25px',
    top: 0,
    left: 0,
  },
  ".radio label input[type=radio]:checked": {
    background: "$green",
    borderRadius:'25px',
  },
  ".radio label input[type=radio]:checked +  span": { color: "$white" },
  "textarea:focus": {
    boxShadow: "0 0 0 0",
    outline: 0,
  },

  textarea: {
    background: "$main",
    border: "2px $white ridge",
    padding: "14px",
    borderRadius: "14px",
    fontSize: "1.3rem",
    color: "white",
    minHeight: "115px",
  },
  "textarea::placeholder": {
    color: "$white",
    fontFamily: "$montserrat",
  },
  ".block": {
    border: "1px solid gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px",
    borderRadius: "34px",
    color: "gray",
  },
  "input[type=radio], input[type=checkbox] ": {
    border: 0,
    width: "25px",
    height: "30px",
    verticalAlign: "middle",
    color: "$green",
  },
  "input:checked": {
    backgroundColor: "red",
    width: "25px",
    height: "25px",
  },
});
