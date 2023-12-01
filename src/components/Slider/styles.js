import { styled } from "@stitches/react";

export const Container = styled("div", {
    display:'flex',
    alignItems:'center',

  ".inner": {
    display: "flex",
  },
  ".item": {
    minWidth: "400px",
    minHeight: "200px",
    padding: "5px",
    width: "200px",
  },

  ".item img ": {
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    pointerEvents: "none",
  },
  ".carousel": {
    overflow: "hidden",
  },
  ".container-carousel": {
    display: "flex",
    alignItems: "center",
  },
  ".svg": {
    height: "100px",
    width: "100px",
    cursor: "pointer",
  },
  ".svg svg": {
    width: "100%",
    height: "100%",
  },
});
