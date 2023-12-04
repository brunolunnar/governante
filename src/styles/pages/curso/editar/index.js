import { styled } from "@stitches/react";

export const EditarContainer = styled('section',{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    form:{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width:'80%',
        maxWidth:'60%',
        marginTop:'4rem'
    },
    '.img-box':{
        display:'flex',
        justifyContent:'center'
    },
    '.img-box img':{
        width:'187px',
        height:'274px',
    },
    input:{
        background:'$main',
        border:'2px $white ridge',
        padding:'14px',
        borderRadius:'2rem',
        fontSize:'1.3rem'
    },
    'input::placeholder':{
      color:'white',

    },
    '.modules-layout':{
      background:'$main',
      border:'2px $white ridge',
      padding:'14px',
      borderRadius:'2rem',
      fontSize:'1.3rem',
      fontWeight:'100'
    },
    textarea:{
        background:"$main",
        border:'2px $white ridge',
        padding:'10px',
        borderRadius:'14px',
        minHeight:'83px',
        maxWidth:'97%',
        maxHeight:"100px",
        minWidth:'97%'
      },
      "textarea::placeholder":{
        color:'white'
      },
      ".trilha": {
        display: "flex",
        justifyContent: "space-between",
        alignItems:'center'
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
      ".confirm-btn": {
        background: "$green",
        color: "$white",
        border: "2px solid $white",
        borderRadius: "34px",
        padding: "9px",
        fontSize: "22px",
        width:'11rem'

      },
      '.confirm-curso-btn':{
        background: "$green",
        color: "$white",
        border: "1px solid $white",
        borderRadius: "34px",
        padding: "20px",
        fontSize: "26px",
        width:'80%',
        margin:'2rem 0',
        maxWidth:'60%'
      },
      '.select-btn':{
        background:'$blue',
        color: "$white",
        border: "1px solid $white",
        borderRadius: "34px",
        padding:'8px',
        width:'13rem'
      },
      '.container-modules':{
        width:'100%',
        display:'flex',
        justifyContent:'flex-end'

      },
      '.add-modulo':{
        display:'flex',
        flexDirection:'column',
        width:'80%',
        justifyContent:'end',
        gap:'22px'
      },
      '.add-aula':{
        display:'flex',
        flexDirection:'column',
        width:"80%",
        gap:'22px'
      },
      '.aula-container-add':{
        width:'100%',
        display:'flex',
        justifyContent:'end',
      },
      '.aula-container':{
        display:'flex',
        flexDirection:'column',
        gap:'30px'
      },
      ".button-box":{
        width:"100%",
        display:'flex',
        justifyContent:'end'

      }
})
