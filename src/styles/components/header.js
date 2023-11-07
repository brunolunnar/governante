import { styled } from "..";

export const HeaderContainer = styled('header',{

    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'30px 5px',
    a:{
        fontSize:'25px',
        cursor:'pointer'
    },
    '.header-box':{
        display:"flex",
        gap:'3rem'
    },
    '.logo':{
        width:'12%',
        height:'auto',
        cursor:'pointer',
    },
    '.menu':{
        cursor:'pointer'
    }


})