import { styled } from "@/styles";

export const SideBarListContainer = styled('div',{
    display:'flex',
    flexDirection:"column",
    fontSize:'1.3rem',
    '.logo-box':{
            display:'flex',
            alignItems:'center',
         
    },
    ".recurses-box":{
        height:'73%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        lineHeight:'1.6rem',
        padding:'0px 30px 0 0',
        marginTop:'3rem'
    },
    '.welcome-box':{
        lineHeight:'1.6rem'
    },
    '.link:hover':{
        '&:hover , &:hover span':{
          color:'$blue'
        }
      },
    '.exit':{
        marginTop:"3rem",
        color:'$red'
    },
    img:{
        width:'5rem',
        height:'3rem',
        marginLeft:'-7rem'
    }
    
    
})