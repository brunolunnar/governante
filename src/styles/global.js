import { globalCss } from ".";

export const globalStyle = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: "100%",

    verticalAlign: "baseline",
  },
  "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section":
    {
      display: "block",
    },
  body: {
    lineHeight: 1,
    background: ' rgb(36,44,72)',
    background: 'radial-gradient(circle, rgba(36,44,72,1) 55%, rgba(28,34,54,1) 70%, rgba(18,20,31,1) 90%)',
    height:'100vh',
    fontFamily: "'Montserrat', sans-serif",
    color: "white",
    margin: "0 auto",
    maxWidth: "1400px",
    fontWeight: "normal",
    opacity: 1,
  },
  input: {
    color: "white",
  },
  "ol, ul": {
    listStyle: "none",
  },
  "blockquote, q": {
    quotes: "none",
  },
  "blockquote:before, blockquote:after, q:before, q:after": {
    content: "''",
  },
  a: {
    textDecoration: "none",
  },
  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
  },
  button: {
    cursor: "pointer",
  },
});
