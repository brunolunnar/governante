import { useState } from "react";
import {AdicionarAula} from "../aula/AddAula"

export const ModuleBox = () => {
  const [numModulos, setNumModulos] = useState(1);

  const adicionarModulo = (e) => {
    e.preventDefault();
    setNumModulos(numModulos + 1);
  };

  return (
    <>
      <button className="select-btn" onClick={adicionarModulo}>
        Adicionar Módulo +
      </button>
      {[...Array(numModulos)].map((_, index) => (
        <div className="container-modules">
          <div key={index} className="add-modulo">
            <input type="text" placeholder={`Módulo ${index + 1}`} />
            <AdicionarAula />
          </div>
        </div>
      ))}
    </>
  );
};
