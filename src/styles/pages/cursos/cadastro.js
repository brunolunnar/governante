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
    flexDirection: "column",
    gap: "2rem",
    width: "80%",
    maxWidth: "60%",
    marginTop: "4rem",
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
