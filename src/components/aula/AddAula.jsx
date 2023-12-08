import React, { useState } from "react";
import UploadAula from "../Upload/UploadAula";

const AdicionarAula = ({ handleOpenPicker, estadoAulas }) => {
  const [aulas, setAulas] = useState(estadoAulas);

  const adicionarAula = (e) => {
    e.preventDefault()
    setAulas(
      [...aulas, 
        { 
          id: aulas.length + 1 ,
          descricao: "",
          moduloRef
          : 
          "382283152003956800",
          slugModulo
          : 
          "liminha-liminha-38354",
          titulo_aula: ""

        }
      ]
    );
  };

  const removerAula = (e,index) => {
    console.log(e)
    e.preventDefault()
    setAulas(aulas.filter((aula,i) => i !== index));
  };

  return (
    <div className="aula-container-add">
      <div className="add-aula">
        <button className="select-btn" onClick={adicionarAula}>
          Adicionar Aula +
        </button>

        {aulas.length === 0 ? (
          <p>Clique em "Adicionar Aula" e registre uma nova aula.</p>
        ) : (
          aulas.map((aula, index) => (
            <div key={index} className="aula-container">
              <input type="text" placeholder={`Aula ${index}`} value={aula.titulo_aula}/>

              <textarea placeholder="Descrição" value={aula.descricao}></textarea>

              <span>Vídeo</span>
              <input type="text" placeholder={`link do vídeo (google drive ou youtube)`} value={aula.video}/>

              <span>Anexo</span>
              <UploadAula handleOpenPicker={handleOpenPicker}></UploadAula>

              <button
                className="confirm-btn"
                onClick={(e) => removerAula(e,index)}
              >
                Remover Aula
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdicionarAula;
