import { useState } from "react";
import {AdicionarAula} from "../aula/AddAula"

export const ModuleBox = ({handleOpenPicker}) => {
  const [numModulos, setNumModulos] = useState(1);

//criar uma rota que ja crie o id e armazenar o id no estado 
  //post da api
  const adicionarModulo = (e) => {
    e.preventDefault();
    setNumModulos(numModulos + 1);
  };
let array = [{
  refFauna: '381379180526305346',
  ordem: 0,
  nome: "indtroducao",
  descricao: "descricao do modulo de introducao",
  aulas: [
    {
      ordem: 0,
      refFauna: "381379673417842752"
    }
  ]
},

{
  refFauna:"381379481326059584",
  ordem: 1,
  nome: "modulo 1",
  descricao: "descricao modulo 1",
  aulas: [
    {
      ordem: 0,
      refFauna: "237871"
    },
    {
      ordem: 1,
      refFauna: "237871"
    },
    {
      ordem: 2,
      refFauna: "237871"
    }
  ]
}
]

// const console = (e, modulo)=>{
//   e.preventDefault()
//   return console.log(modulo)
// }
  return (
    <>
      <button className="select-btn" onClick={adicionarModulo}>
        Adicionar Módulo +
      </button>
      {/* {[...Array(numModulos)].map((_, index) => (
        <div className="container-modules">
          <div key={index} className="add-modulo">
            <input type="text" placeholder={`Módulo ${index + 1}`} />
            <AdicionarAula handleOpenPicker={handleOpenPicker} />
          </div>
        </div>
      ))} */}
      {
        array.map((modulo)=>{
          return (
            <div className="container-modules">
            <div key={modulo.ordem} className="add-modulo">
              <input type="text" placeholder={`Módulo ${modulo.ordem}`} />
              {/* <AdicionarAula handleOpenPicker={handleOpenPicker} /> */}
              <button type="button" onClick={(e)=> {
                  e.preventDefault()
                  console.log(modulo)
                  console.log("modulo")

              }}>Teste</button>
            </div>
          </div>
          )
        })
      }
    </>
  );
};
