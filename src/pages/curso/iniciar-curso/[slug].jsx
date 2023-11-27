import { AulaInitialContianer } from "./style";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "@/components/header";


export const AulaCurso = ({ curso }) => {
  const data = curso.data;
  const emptyClasses = {};
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
        ></iframe>

        
        <div className="acordions-box">
          <Accordion id="box">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="acordion-title">Descrição</p>
            </AccordionSummary>
            <AccordionDetails>
              <p className="acordion-text">{data.descricao}</p>
            </AccordionDetails>
          </Accordion>

          <Accordion id="box" classes={emptyClasses}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="acordion-title">Módulos</p>
            </AccordionSummary>
            <AccordionDetails classes={emptyClasses}>
              {data.modulos.map((modulo) => (
                <Accordion key={modulo.slugModulo}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${modulo.slugModulo}-content`}
                  >
                    <Typography>{modulo.titulo_modulo}</Typography>
                  </AccordionSummary>
                  <div className="acordion-aula-box">
                    {modulo.aulas.map((aula) => (
                      <Accordion
                        id="aula-box"
                        key={aula.slugAula}
                        className="acordion-togle"
                      >
                        <Typography className="conteudo-acordion">
                          {aula.titulo_aula}
                        </Typography>
                      </Accordion>
                    ))}
                  </div>
                </Accordion>
              ))}
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

  const response = await fetch(
    `https://governante.vercel.app/api/relations/list/${query.slug}`
  );
  const data = await response.json();

  return {
    props: {
      curso: data,
    },
  };
};
export default AulaCurso;
