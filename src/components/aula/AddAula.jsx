import React, { useState, useEffect } from "react";
import UploadAula from "../Upload/UploadAula";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AdicionarAula = ({ handleOpenPicker, estadoAulas, indexModulo, onUpdateTodasAulas }) => {
  const [aulas, setAulas] = useState(estadoAulas);

  const adicionarAula = (e) => {
    e.preventDefault()
    setAulas(
      [...aulas,
      {
        descricao: "",
        order: aulas.lenght + 1,
        moduloRef: "",
        slugModulo: "",
        titulo_aula: ""

      }
      ]
    );
  };

  const removerAula = (e, index) => {
    console.log(e)
    e.preventDefault()
    setAulas(aulas.filter((aula, i) => i !== index));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    const arrayPivot = [...aulas];

    // Altera o título do módulo para o índice específico
    arrayPivot[index][name] = value;

    // Atualiza o estado com o novo array
    setAulas(arrayPivot);
    // setModulos(modulos.filter());
  };

  const updateTodasAulas = (indexModulo) => {
    console.log("update de aulas iniciado")
    console.log(aulas)
    console.log(indexModulo)
    console.log('indexModulo')
    onUpdateTodasAulas(aulas, indexModulo)
  }

  useEffect(() => {
    updateTodasAulas(indexModulo)
  }, [aulas])

  return (
    <div className="aula-container-add">
      <div className="add-aula">


        {aulas.length === 0 ? (
          <p>Clique em "Adicionar Aula" e registre uma nova aula.</p>
        ) : (
          aulas.map((aula, index) => (
            <div key={index} className="aula-container">
              <Accordion className="add-modulo">
                <div className='cabecaAccordion'>
                  <input
                    type="text"
                    placeholder={`Aula ${index}`}
                    value={aula.titulo_aula}
                    name="titulo_aula"
                    onChange={(e) => handleChange(e, index)}
                  />
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  </AccordionSummary>
                </div>
                <AccordionDetails>
                  <div className="container-flex-end">
                    <button
                      className="remove-btn"
                      // onClick={(e) => removerAula(e, index)}
                      onClick={(e) => {
                        let confirma = confirm(`Deseja mesmo excluir a aula: ${aula.titulo_aula}`);
                        if (confirma) {
                          removerAula(e, index)
                        } else {
                          console.log('cancelado')
                        }
                      }}
                    >
                      Remover {aula.titulo_aula}
                    </button>
                  </div>

                  <textarea
                    placeholder="Descrição"
                    value={aula.descricao}
                    name="descricao"
                    onChange={(e) => handleChange(e, index)}
                  ></textarea>

                  <span>Vídeo</span>
                  <input
                    type="text"
                    placeholder={`link do vídeo (google drive ou youtube)`}
                    value={aula.video}
                    name="video"
                    onChange={(e) => handleChange(e, index)}
                  />

                  {/* <span>Anexo</span>
              <UploadAula handleOpenPicker={handleOpenPicker}></UploadAula> */}
                </AccordionDetails>
              </Accordion>
            </div>
          ))
        )}

        <button className="select-btn" onClick={adicionarAula}>
          Adicionar Aula +
        </button>

      </div>
    </div>
  );
};

export default AdicionarAula;
