import { styled } from "@stitches/react";

export const AcordionContainer = styled('div',{
    /* styles/Accordion.css (ou onde você preferir) */

/* Estilo geral do acordeão */
'.react-accessible-accordion': {
    width: '100%',
    maxWidth: '600px', /* Ajuste conforme necessário */
    margin: 'auto',
  },
  
  /* Estilo do item do acordeão */
  '.react-accessible-accordion__item': {
    'borderBottom': '1px solid #ddd',
  },
  
  /* Estilo do cabeçalho do item do acordeão */
  '.react-accessible-accordion__heading' :{
    'backgroundColor': '#f4f4f4',
    padding: '10px',
    cursor: 'pointer',
  },
  
  /* Estilo do conteúdo do item do acordeão */
  '.react-accessible-accordion__panel': {
    padding: '10px',
  }
  
})