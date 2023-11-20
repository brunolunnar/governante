import { useState } from "react";
import React from 'react';
import UploadAula from "../Upload/UploadAula";

export const AdicionarAula = ({handleOpenPicker}) => {
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
            <UploadAula handleOpenPicker={handleOpenPicker}></UploadAula>

            <span>Anexo</span>
            <UploadAula handleOpenPicker={handleOpenPicker}></UploadAula>
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
