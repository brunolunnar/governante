import { useState } from "react";
import {AdicionarAula} from "../aula/AddAula"
import { useRouter } from "next/router";


export const ModuleBox = ({handleOpenPicker}) => {
  const [numModulos, setNumModulos] = useState(1);
  const router = useRouter()
  const url = router.query

    

  //post da api
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
            <AdicionarAula handleOpenPicker={handleOpenPicker} />
          </div>
        </div>
      ))}

    </>
  );
};
