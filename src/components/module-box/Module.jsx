import React, { useEffect, useState } from "react";
import AdicionarAula from "../aula/AddAula";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { gerarSlug } from "@/utils/slugGenerator";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

// function handleModulosInfo({dataModulos}){
//     console.log(dataModulos)
//     console.log('dataModulos')
// }

// export const ModuleBox = ({ handleOpenPicker, dataModulos }) => {
export const ModuleBox = ({ handleOpenPicker, estadoModulos, onUpdateTodosModulos, formData }) => {

  const [modulos, setModulos] = useState(estadoModulos);
  const router = useRouter();

  // handleModulosInfo({modulos})

  const adicionarModulo = (e) => {
    e.preventDefault();
    toast.success("Módulo adicionado.");
    let newModulos = [...modulos, {
      slugCurso: formData.slugCurso,
      titulo_modulo: `Título do Módulo`,
      slugModulo: "",
      order: modulos.length + 1,
      aulas: [],
    }]
    setModulos(newModulos);
  };

  const removerModulo = (e, index) => {
    e.preventDefault()
    toast.error("Módulo removido.")
    setModulos(modulos.filter((modulo, i) => i !== index));
  };

  const updateTodasAulas = (novosAulas, indexModulo) => {
    // setModulos({
    //   ...modulos,
    //   aulas: novosAulas
    // });
    const arrayPivot = [...modulos];

    arrayPivot[indexModulo].aulas = novosAulas

    setModulos(arrayPivot)

    // console.log(arrayPivot[indexModulo].aulas)
    // console.log(indexModulo)
    // console.log(novosAulas)
    // console.log('========= Novas aulas chegando =========')
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    const arrayPivot = [...modulos];

    // Altera o título do módulo para o índice específico
    arrayPivot[index][name] = value;

    // Atualiza o estado com o novo array
    setModulos(arrayPivot);
    // setModulos(modulos.filter());
    // updateCursoModulos()
  };

  const updateCursoModulos = () => {
    console.log("update de módulos iniciado")
    console.log(modulos)
    onUpdateTodosModulos(modulos)
  }

  useEffect(() => {
    updateCursoModulos()
  }, [modulos])

  return (
    <>

      {modulos.map((modulo, index) => (
        <div key={index} className="container-modules">
          {/* {console.log(index)} */}
          <div className="add-modulo">
            <input
              type="text"
              placeholder={`Nome do módulo`}
              value={modulo.titulo_modulo}
              name="titulo_modulo"
              onChange={(e) => handleChange(e, index)}
            />
            <div className="container-flex-end">
              <button className="remove-btn" onClick={(e) => {
                let confirma = confirm(`Deseja mesmo excluir o modulo: ${modulo.titulo_modulo}`);
                if (confirma) {
                  removerModulo(e, index)
                } else {
                  console.log('cancelado');
                  e.preventDefault()
                }

              }}>
                Remover {modulo.titulo_modulo}
              </button>
            </div>


            <AdicionarAula handleOpenPicker={handleOpenPicker} estadoAulas={modulo.aulas} indexModulo={index} onUpdateTodasAulas={updateTodasAulas} />

          </div>

        </div>
      ))}
      <button className="select-btn" onClick={adicionarModulo}>
        Adicionar Módulo +
      </button>
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