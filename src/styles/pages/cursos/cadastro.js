import { styled } from "@stitches/react";

export const CadastroCursoContainer = styled('section',{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    h1:{
        fontSize:'3rem',

    },
    ".upload-box":{
        display:"flex",
        alignItems:'center',
        border:'2px $white dashed',
        borderRadius:'50px',
        padding:10
    },
    form:{
        display:'flex',
        flexDirection:'column',
        gap:'2rem'
    },
    '.confirm-btn':{
        background:'$green',
        color:'$white',
        border:'1px solid $white',
        borderRadius:'34px',
        padding:'20px',
        fontSize:'26px'
    }
})