import { styled } from "@stitches/react";

export const Container = styled("div", {
  display: 'flex',
  alignItems: 'center',

  ".inner": {
    display: "flex",
  },
  ".item": {
    minWidth: "400px",
    minHeight: "200px",
    padding: "5px",
    width: "200px",
  },

  ".item img ": {
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    pointerEvents: "none",
  },
  ".carousel": {
    overflow: "hidden",
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
