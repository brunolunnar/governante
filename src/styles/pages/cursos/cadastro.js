import { styled } from "@stitches/react";

export const CadastroCursoContainer = styled("section", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  h1: {
    fontSize: "3rem",
    marginTop: "2rem",
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
  },
  ".trilha": {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    background: "$main",
    border: "2px $white ridge",
    padding: "10px",
    borderRadius: "2rem",
  },
  textarea: {
    background: "$main",
    border: "2px $white ridge",
    padding: "10px",
    borderRadius: "14px",
  },
});
