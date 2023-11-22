import { styled } from "..";

export const HomePageContainer = styled('section',{
    '.history-list':{
        display:'flex',
        gap:'1.5rem',
        padding:'15px',
        alignItems:'center'
    },
    '.slick-prev':{

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
        cursor:'pointer',
        transition: 'linear 0.3s',
    },
    'li:hover':{
        transform: 'scale(1.15)',
    },
    '.card-box li img':{
        width:'100%',
        height:'100%',
    },
    '.card-box li':{
        width:'247px',
        height:'335px',
    },
    '.time-box':{
        display:'flex',
        gap:'1.5rem',
        padding:'15px',
        alignItems:'center'
    },
    '.card':{
        width:'100px',

    },
    '.card img':{
        width:'100%'
    },
    '.time-box li img':{
        width:'100%',
        height:'100%',
    },
    '.carrosel-box':{
        display:'flex',
        gap:'1rem'
    }

        
})