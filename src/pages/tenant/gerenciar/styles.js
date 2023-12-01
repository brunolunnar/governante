import { styled } from "@stitches/react";

export const GerenciarTenantsContainer = styled('main',{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:"center",
    h1:{
        fontSize:'2rem',
        fontWeight:'normal',

    },
    form:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'80%',
        maxWidth:'60%',

    },
    '.acordion':{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:"center",
           width:'100%',
    },
    input: {
        background: "$main",
        width:'100%',

        border: "2px solid white",
        borderRadius: "34px",
        padding: "10px",
        color: "white",
        margin: "1rem 0",
      },
      "input::placeholder": {
        color: "$white",
      },
      '.add-box':{
        display:'flex',
        alignItems:'center',

        width:'100%',
      
      },
      '.save-box':{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        width:'100%',
        margin:'10px 0' 
      
      },
      '.colaborador-form':{
        display:'flex',
        alignItems:'center',
        flexDirection:'column'
      },
      '.add-btn':{
        background:'$blue',
        color:'$white',
        border:'1px solid $white',
        padding:'8px',
        borderRadius:'30px'
      },
      '.save-btn':{
        background:'$green',
        border:'1px solid $white',
        color:'white',
        padding:'8px',
        borderRadius:'30px'
      },
      textarea:{
        background: "$main",
        width:'100%',

        border: "2px solid white",
        borderRadius: "34px",
        padding: "10px",
        color: "white",
        margin: "1rem 0",
      },
      '.submit-btn':{
        background:'$green',

        color:'white',
        padding:'11px',
        borderRadius:'30px',
        width:'100%'
      }
})