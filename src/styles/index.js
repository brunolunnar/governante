import { createStitches } from "@stitches/react";


export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      main: "#242C48",
      branch: "#008AA8",
      red: "#C93535",
      white:'#fff',
      green: '#3EA270',
      blue:"#4289A6",
      'green-400':'#3FA16F',
   
    },
    fonts:{
      montserrat:'Montserrat'
    }
  },
});