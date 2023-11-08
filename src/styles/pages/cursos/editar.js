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
        padding:'10px',
        borderRadius:'2rem'
    },
    textarea:{
        background:"$main",
        border:'2px $white ridge',
        padding:'10px',
        borderRadius:'14px'
      },
      ".trilha": {
        display: "flex",
        justifyContent:'space-between'
      },
      ".confirm-btn": {
        background: "$green",
        color: "$white",
        border: "1px solid $white",
        borderRadius: "34px",
        padding: "20px",
        fontSize: "26px",
      },
      '.select-btn':{
        background:'$blue',
        color: "$white",
        border: "1px solid $white",
        borderRadius: "34px",
      },
      '.add-modulo':{
        display:'flex',
        flexDirection:'column'
      },
      '.add-aula':{
        display:'flex',
        flexDirection:'column'
      },
      '.aula-container':{
        display:'flex',
        flexDirection:'column'
      }
})
