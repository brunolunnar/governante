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
      main: "radial-gradient(at center center,#161C2F 0%, #000000 100%);",
      branch: "#008AA8",
      red: "#C93535",
      white:'#fff',
      green: '#3EA270'
    },
  },
});