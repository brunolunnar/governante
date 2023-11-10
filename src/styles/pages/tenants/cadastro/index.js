import { styled } from "@stitches/react";

export const TenantCadastroContainer = styled('main',{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    h1:{
        fontSize:'2rem',
        fontWeight:'normal',
        margin:'1.6rem 0',
    },
    form:{
        width:'80%',
        maxWidth:"60%",
        display:'flex',
        flexDirection:'column',

    },
    ".add-btn": {
        background: "$green",
   
        borderRadius: "34px",
        fontSize: "2rem",
        color: "$white",
        border: "1px solid $white",
      },
      input: {
        background: "$main",
        border: "2px solid white",
        borderRadius: "34px",
        padding: "10px",
        color: "white",
        margin: "1rem 0",


      },
      "input::placeholder": {
        color: "$white",
      },

})