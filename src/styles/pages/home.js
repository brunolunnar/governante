import { styled } from "..";

export const HomePageContainer = styled('section',{
  
    '.history-list':{
        display:'flex',
        gap:'1.5rem',
        padding:'15px',
        alignItems:'center'
    },
    '.history-list li img':{
        width:'100%',
        height:'100%',
    },
    '.history-list li':{
        width:'100px'
    },
    h1:{
        padding:14,
        fontSize:'1.6rem'
    },
    '.card-box':{
        display:'flex',
        gap:'1.5rem',
        padding:'15px',
        alignItems:'center'
    },
    li:{
        transition: 'linear 0.3s',
    },
    'li:hover':{
        transform: 'scale(1.10)',
    },
    '.card-box li img':{
        width:'100%',
        height:'100%',
    },
    '.card-box li':{
        width:'247px',
        height:'335px',
    },
    span:{
        color:'LightGrey',
        fontWeight:100  
    },
    '.time-box':{
        display:'flex',
        gap:'1.5rem',
        padding:'15px',
        alignItems:'center'
    },
    '.time-box li img':{
        width:'100%',
        height:'100%',
    },
    
        
})