import { useState } from "react";
// import { UploadBox } from "../uploadBox";
import React from 'react';

export const AdicionarAula = () => {
  const [numAulas, setNumAulas] = useState(1);

  const adicionarAula = (e) => {
    e.preventDefault();
    setNumAulas(numAulas + 1);
  };

  return (
    <div className="aula-container-add">
      <div className="add-aula">
        <button className="select-btn" onClick={adicionarAula}>
          Adicionar Aula +
        </button>

        {[...Array(numAulas)].map((_, index) => (
          <div key={index} className="aula-container">
            <input type="text" placeholder={`Aula ${index + 1}`} />
            <textarea placeholder="Descrição"></textarea>

            <span>Vídeo</span>
            {/* <UploadBox></UploadBox> */}

            <span>Anexo</span>
            {/* <UploadBox></UploadBox> */}
            <div className="button-box">
              <button className="confirm-btn">Salvar Aula</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdicionarAula;
