import React, { useState } from "react";
import AdicionarAula from "../aula/AddAula";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// function handleModulosInfo({dataModulos}){
//     console.log(dataModulos)
//     console.log('dataModulos')
// }

// export const ModuleBox = ({ handleOpenPicker, dataModulos }) => {
export const ModuleBox = ({ handleOpenPicker, estadoModulos}) => {

  try{
    console.log(estadoModulos)
    console.log('TÁ CHEGANDO estadoModulos')
  } catch(erro){
    console.error("chegou foi nada", erro)
  }
  

  const [modulos, setModulos] = useState([{ id: 1, numAulas: 1 }]);
  const router = useRouter();
  
  handleModulosInfo({modulos})

  const adicionarModulo = (e) => {
    e.preventDefault();
    toast.success("Módulo adicionado.");
    setModulos([...modulos,{
      titulo_modulo: 'TITULO 03',
      aulas: [],
      slugModulo: 'titulo-03-13216'
    }]);
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