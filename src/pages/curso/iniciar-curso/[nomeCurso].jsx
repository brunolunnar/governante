import { AulaInitialContianer } from "./style";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AulaCurso = ({ curso }) => {
  console.log(curso && curso.data, "data curso");

  console.log(curso.data, "data curso");
  const data = curso.data[0];
  console.log(data);
  return (
    <AulaInitialContianer>
      <h1>{data.nome}</h1>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/vkDMs4BcbNU?si=aKvq-YzlJyEjEbTR"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      
      <Accordion id='box'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Descrição</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {data.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion id="box1">
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
    <Typography>Módulos 1</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {/* Conteúdo do primeiro Accordion */}
    <Accordion id="box2">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Submódulos 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Conteúdo do submódulo 1.
        </Typography>
      </AccordionDetails>
      <AccordionDetails>
        <Typography>
          Conteúdo do submódulo 1.
        </Typography>
      </AccordionDetails>
      <AccordionDetails>
        <Typography>
          Conteúdo do submódulo 1.
        </Typography>
      </AccordionDetails>
    </Accordion>
    {/* Adicione mais Accordions conforme necessário */}
  </AccordionDetails>
</Accordion>

<Accordion id="box">
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel3a-content"
    id="panel3a-header"
  >
    <Typography>Módulos 2</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {/* Conteúdo do segundo Accordion */}
    <Accordion id="box">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4a-content"
        id="panel4a-header"
      >
        <Typography>Submódulos 2</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Conteúdo do submódulo 2.
        </Typography>
      </AccordionDetails>
    </Accordion>
    {/* Adicione mais Accordions conforme necessário */}
  </AccordionDetails>
</Accordion>


    </AulaInitialContianer>
  );
};
export const getServerSideProps = async (context) => {
  const { query } = context;

  const response = await fetch(
    `https://governante.vercel.app/api/curso/list/${query.nomeCurso}`
  );

  const data = await response.json();

  return {
    props: {
      curso: data,
    },
  };
};
export default AulaCurso;
