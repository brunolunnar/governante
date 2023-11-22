import { styled } from "@stitches/react";

export const AulaInitialContianer = styled('div',{

    '#panel1a-header, #panel2a-header':{
        background: '$main',
        borderRadius:'34px',
        border:'solid 2px white',
        color:'$white',
        fontFamily:'$montserrat'

    },
    '#box':{
        background:'rgba(255, 0, 0, 0)',
        borderRadius:'34px',
        border:'none',
        boxShadow:'none'
    },
    'path':{
        color:'$white'
    }
})