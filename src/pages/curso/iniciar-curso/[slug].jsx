import { AulaInitialContianer } from "./style";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "@/components/header";

export const AulaCurso = ({ curso }) => {
  console.log(curso && curso.data, "data curso");

  console.log(curso.data, "data curso");
  const data = curso.data[0];
  console.log(data);
  return (
    <>
      <Header></Header>
      <AulaInitialContianer>
        <h1>{data.nome}</h1>

        <iframe
          width="80%"
          height="450px"
          src="https://www.youtube.com/embed/vkDMs4BcbNU?si=aKvq-YzlJyEjEbTR"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div className="acordion-box">
          <Accordion id="box">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Descrição</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data.description}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion id="box">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="module-acordion"
            >
              <Typography>Módulos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Conteúdo do primeiro Accordion */}
              <Accordion id="box">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Módulo 01</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Conteúdo do submódulo 1.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion id="box">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Módulo 01</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Conteúdo do submódulo 1.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion id="box">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Módulo 01</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Conteúdo do submódulo 1.</Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>Conteúdo do submódulo 1.</Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>Conteúdo do submódulo 1.</Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>Conteúdo do submódulo 1.</Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>Conteúdo do submódulo 1.</Typography>
                </AccordionDetails>
              </Accordion>
              
        
   
            </AccordionDetails>
          </Accordion>
        </div>
        <button className="confirm-btn">Iniciar Curso</button>
      </AulaInitialContianer>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const { query } = context;
console.log(query.slug)
  const response = await fetch(
    `https://governante.vercel.app/api/curso/list/${query.slug}`
  );
console.log("RESPONSE ", response)
  const data = await response.json();

  return {
    props: {
      curso: data,
    },
  };
};
export default AulaCurso;
