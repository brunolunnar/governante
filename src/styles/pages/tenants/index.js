import { styled } from "@stitches/react";

export const TenantContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  h1: {
    fontSize: "2rem",
    fontWeight: "normal",
  },
  ".add-box": {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  ".add-btn": {
    background: "$green",
    width: "40px",
    borderRadius: "50%",
    fontSize: "2rem",
    color: "$white",
    border: "1px solid $white",
  },
  input: {
    background: "$main",
    width: "80%",
    maxWidth: "60%",
    border: "2px solid white",
    borderRadius: "34px",
    padding: "10px",
    color: "white",
    margin: "2rem 0",
  },
  "input:placeholder": {
    color: "$white",
  },
  ul: {
    width: "80%",
    maxWidth: "60%",
    display:'flex',
    flexDirection:'column',
    gap:'1rem'
    
  },
  li:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding:"10px",

    borderBottom:'1px solid $white'
  },
  ".title": {
    background: "$blue",
    color: "black",
    fontWeight: "bolder",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding:"10px",
    borderRadius:'30px'
  },
  '.fature-box':{
    display:"flex",
    gap:'8px'
  },
  '.btn':{
    background:'$blue',
    width:'32px',
    padding:'3px',
    display:"flex",
    alignItems:'center',
    justifyContent:'center'
  }
});
