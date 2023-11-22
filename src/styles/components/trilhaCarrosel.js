import { styled } from "..";

export const CustomCard = styled('div',{

    height: '355px',

    margin: '0 10px',  
    overflow: 'hidden',
    borderRadius: '6px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
    transition: 'transform 0.3s ease-in-out',
  

    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '8px',
      '-moz:transition':'all 0.3s',
      '-webkit-transition':'all 0.3s',
      'transition':'all 0.3s',
    },
  
    '&:hover img': {
        '-moz:transform':'scale(1.1)',
        '-webkit-transform':'scale(1.1)',
        'transform':'scale(1.1)',  
    },


})