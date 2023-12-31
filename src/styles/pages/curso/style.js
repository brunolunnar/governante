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
    width: "50%",

  },
  path: {
    color: "$white",
  },
  ".confirm-btn": {
    background: "$green",
    color: "$white",
    fontFamily: '$montserrat',
    border: "2px solid $green",
    borderRadius: "49px",
    padding: "20px",
    fontSize: "31px",
    width: "64%",
    margin: "1rem 0px 3rem 0px",
  },
  "button:hover": {
    border: "2px solid $white",
  },

  ".module-acordion": {
    border: "2px solid #4189A6 !important",
    color: "#4189A6 !important",
    fontSize: '25px'
  },
  // '.MuiPaper-root .MuiPaper-elevation .MuiPaper-rounded .MuiPaper-elevation1 .MuiAccordion-root .MuiAccordion-rounded .MuiAccordion-gutters .css-1elwnq4-MuiPaper-root-MuiAccordion-root':{
  //   width:'80%'
  // },
  '.MuiAccordionDetails-root ': {
    padding: '10px 0',
    width: '90%',
  },
  '.MuiButtonBase-root .MuiAccordionSummary': {
    background: 'green',
    width: '100%'
  },
  '.MuiButtonBase-root .MuiAccordionSummary-root .Mui-expanded .MuiAccordionSummary-gutters .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root': {
    width: '100%'
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
  "#panel1a-content": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },
  '.testando': {
    background: "$main",
    color: "$white",
    fontFamily: "$montserrat",
    fontSize: "27px",
    width: "100%",

  },
  '.aula-box': {
    background: "$main",
    borderRadius: "34px",
    border: "solid 2px white",
    color: "$white",
    fontFamily: "$montserrat",
    fontSize: "27px",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  '.check': {
    background: 'green',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
  '.conteudo-acordion': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width: '80%',
    background: 'none',
    border: '2px solid $white',
    color: 'white',
    padding: '15px',
    borderRadius: '34px'
  },
  '.current-aula':{
    border: '2px solid $blue !important',
  },
  '.view-icon':{
    width:'30px',
    height:'30px',
    borderRadius:'100px',
    background:'$red',
    position:'absolute',
    right:'-15px',
    top:'-15px',
  },
  '.view-icon.checked':{
    background:'$green',

  },
  '.video-box':{
    position:'relative'
  },
  '.acordions-box': {
    width: '100%',
    display: "flex",
    flexDirection: 'column',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '.acordion-togle': {
    background: '$main',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  '.acordion-text': {
    color: '$white',
    fontFamily: '$montserrat',
    fontSize: '1.4rem'
  },
  '.acordion-title': {
    fontFamily: '$montserrat',
    fontSize: '1.2rem',
    marginLeft: '1rem'
  },
  '.MuiAccordionSummary-gutters svg': {
    width: '5rem',
    height: '3rem'
  },
  '.css-1elwnq4-MuiPaper-root-MuiAccordion-root': {
    background: 'none',
    color: 'white',
    fontFamily: "$montserrat",
  },
  '.acordion-aula-box': {

    display: 'flex',
    flexDirection: 'column',
    gap: "10px",
    padding: '10px'
  },
  '.MuiAccordionSummary-gutters': {
    border: '1px solid white',
    borderRadius: '35px',
  },
  ".MuiPaper-root.MuiPaper-elevation":{
    background: '#ffffff00',
    color: '#ffffff',
  },
  ".video-container":{
    position:'relative',
  },
  "#aula-anterior":{
    position:'absolute',
    top:'50%',
    left:'-40px',
  },
  "#aula-anterior svg":{
    transform: 'rotate(90deg)',
  },
  "#proxima-aula":{
    position:'absolute',
    top:'50%',
    right:'-40px',
  },
  "#proxima-aula svg":{
    transform: 'rotate(-90deg)',
  }

});
export default AulaInitialContianer;
