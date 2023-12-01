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
    position:'relative',
    background:
      "transparent radial-gradient(closest-side at 50% 50%, rgba(36, 44, 72, 1) 0%, rgba(18, 20, 31, 1) 100%) 0% 0% no-repeat padding-box;",
    opacity: "1",
    minHeight:'100vh',
    fontFamily: "$montserrat",
    color: "white",
    margin: "0 auto",
    maxWidth: "1400px",
    fontWeight: "normal",
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
    fontFamily: "'Montserrat', sans-serif",
  },
});
