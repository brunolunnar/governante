import { AulaInitialContianer } from "./style";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "@/components/Header/header";
import { montarCursoPorSlug } from "@/utils/connections";
import { CheckBox } from "@mui/icons-material";

export const getServerSideProps = async (context) => {
  
  try {
    const { query } = context;
    const responseCurso = await fetch(`https://governante.app/api/relations/list/${query.slug}`);
    // const curso = await responseCurso.json();
    const curso = await montarCursoPorSlug(query.slug)
    console.log(curso)
    console.log("curso")
    
    return {
      props: {
        curso,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: "Ocorreu um erro ao carregar o curso.",
      },
    };
  }
  
};

export const AulaCurso = ({ curso }) => {
  const data = curso;
  console.log(curso)
  console.log('curso')
  console.log(data)
  const [formData, setFormData] = useState({
    nome: data.nome,
    descricao: data.descricao,
    accessos: data.accessos,
    categoria: data.categoria,
    capa: data.capa,
    publicado: data.publicado,
    modulos: data.modulos,
    slugCurso: data.slug
  });

  const emptyClasses = {};
  console.log(data)
  console.log('data')
  return (
    <>
      <Header></Header>
      <AulaInitialContianer>
        <h1>{formData.nome}</h1>

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
              <p className="acordion-text">{formData.descricao}</p>
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
              {formData.modulos.map((modulo) => (
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
                          <div>
                            {aula.titulo_aula}
                          </div>
                          <div>
                            <CheckBox></CheckBox>
                          </div>
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

// export const getServerSideProps = async (context) => {
//   const { query } = context;

//   const response = await fetch(
//     `https://governante.vercel.app/api/relations/list/${query.slug}`
//   );
//   const data = await response.json();

//   return {
//     props: {
//       curso: data,
//     },
//   };
// };


export default AulaCurso;