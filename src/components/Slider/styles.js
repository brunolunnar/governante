import { styled } from "@stitches/react";

export const Container = styled("div", {
  display: 'flex',
  alignItems: 'center',

  ".inner": {
    display: "flex",
  },
  ".item": {
    width: "300px",
    minWidth: "300px",
    minHeight: "200px",
    padding: "5px",
  },

  ".item img ": {
    width: "100%",
    height: "440px",
    borderRadius: "12px",
    pointerEvents: "none",
    objectFit: 'cover',
  },
  ".carousel": {
    overflow: "hidden",
    width: '100%',
  },
  ".container-carousel": {
    display: "flex",
    alignItems: "center",
  },
  ".svg": {
    height: "100px",
    width: "100px",
    cursor: "pointer",
  },
  ".svg svg": {
    width: "100%",
    height: "100%",
  },
  ".homecapa": {
    position: "relative",
    cursor:'pointer',
  },
  ".item .edit-icon": {
    display: 'flex',
    position: 'absolute',
    right: '5px',
    top: '5px',
    padding: '5px',
    borderRadius: '100px',
    background: '#C63737',
    cursor:'pointer',
  },
  ".item .edit-icon img": {
    width:'20px',
    height:'20px',
    borderRadius:'0',
  },
  ".capa-box":{
    position:'relative'
  },
  ".cabecaAccordion div#panel1a-header":{
    height:'100%'
  },
  ".cabecaAccordion .Mui-expanded":{
    background:'#C63737'
  },
  ".imageUplodead":{
    width:'200px'
  },

});
