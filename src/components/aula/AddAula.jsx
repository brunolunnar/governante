import React, { useState } from "react";
import UploadAula from "../Upload/UploadAula";

const AdicionarAula = ({ handleOpenPicker }) => {
  const [aulas, setAulas] = useState([]);

  const adicionarAula = (e) => {
    e.preventDefault()
    setAulas([...aulas, { id: aulas.length + 1 }]);
  };

  const removerAula = (e,aulaId) => {
    e.preventDefault()
    setAulas(aulas.filter((aula) => aula.id !== aulaId));
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
          aulas.map((aula) => (
            <div key={aula.id} className="aula-container">
              <input type="text" placeholder={`Aula ${aula.id}`} />
              <textarea placeholder="Descrição"></textarea>

              <span>Vídeo</span>
              <input type="text" placeholder={`link do vídeo (google drive ou youtube)`} />

              <span>Anexo</span>
              <UploadAula handleOpenPicker={handleOpenPicker}></UploadAula>

              <button
                className="confirm-btn"
                onClick={(e) => removerAula(e,aula.id)}
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
