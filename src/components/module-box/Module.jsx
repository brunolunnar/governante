import React, { useState } from "react";
import AdicionarAula from "../aula/AddAula";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const ModuleBox = ({ handleOpenPicker }) => {
  const [modulos, setModulos] = useState([{ id: 1, numAulas: 1 }]);
  const router = useRouter();

  const adicionarModulo = (e) => {
    e.preventDefault();
    toast.success("Módulo adicionado.");
    setModulos([...modulos, { id: modulos.length + 1, numAulas: 1 }]);
  };

  const removerModulo = (moduleId) => {
    toast.error("Módulo removido.")
    setModulos(modulos.filter((modulo) => modulo.id !== moduleId));
  };

  return (
    <>
      <button className="select-btn" onClick={adicionarModulo}>
        Adicionar Módulo +
      </button>
      {modulos.map((modulo) => (
        <div key={modulo.id} className="container-modules">
          <button onClick={() => removerModulo(modulo.id)}>
            Remover Módulo
          </button>
          <div className="add-modulo">
            <input type="text" placeholder={`Módulo ${modulo.id}`} />
            <AdicionarAula handleOpenPicker={handleOpenPicker} />
          </div>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps = async (context) => {
  
  const { query } = context;
  const response = await fetch(
    `https://governante.app/api/modulos/create/${query.slug}`
  );
  const data = await response.json();
  console.log(data)
  return {
    props: {
      modulo: data,
    },
  };
};