import Header from "@/components/Header/header";
import { EditarContainer } from "@/styles/pages/curso/editar";
import { ModuleBox } from "@/components/module-box/Module";
import { useState } from "react";
import { useRouter } from "next/router";

export const EditarCurso = ({ curso, error }) => {
  // const [cursodata, setCursoData] = useState(curso.data[0]);
  const data = curso.data[0]

  console.log(data)
  // console.log(cursodata)
  const [formData, setFormData] = useState({
    nome: data.nome,
    descricao: data.descricao,
    accessos: data.accessos,
    categoria: data.categoria

  });
  console.log(formData)
  console.log('formData')
  const router = useRouter()
  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSaveCurso = async () => {
    const queryUrl = router.query
    console.log("aqui é  query do userouter", queryUrl.slug)
    try {
      const response = await fetch(`/api/curso/update/${queryUrl.slug}`
      ,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const updateData = await response.json();
      console.log(updateData);
      console.log(response);
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
    }
    console.log('teste')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Header></Header>
      <EditarContainer>
        <h1>Editar curso</h1>
        <form>
          <div className="img-box"></div>
          <input type="text" placeholder={data.nome} onChange={(e) => handleInputChange(e, "nome")} />
          <textarea
            placeholder={data.descricao}
            onChange={(e) => handleInputChange(e, "descricao")}
          />

          <div className="trilha">
            <p>Trilha</p>
            <div className="radio">
              <label htmlFor="prof">
                <input
                  id="prof"
                  className="trilha-check"
                  type="radio"
                  name="categoria"
                  value="Profissional"
                  checked=""
                  onChange={handleChange}
                />
                <span>Profissional</span>
              </label>
            </div>
            <div className="radio">
              <label htmlFor="estrategia">
                <input
                  id="estrategia"
                  className="trilha-check"
                  type="radio"
                  name="categoria"
                  value="Estratégica"
                  checked=""
                  onChange={handleChange}
                />
                <span>Estratégica</span>
              </label>
            </div>
          </div>


          <div className="trilha-box">
            <p>Trilha</p>
            <label htmlFor="prof">Profissional</label>
            <input type="checkbox" id="prof" />
            <label htmlFor="estrategia">Estratégia</label>
            <input type="checkbox" id="estrategia" />
          </div>
          <label htmlFor="access">Acesso ao Curso</label>
          <input
            type="text"
            id="access"
            placeholder={data.accessos}
            onChange={(e) => handleInputChange(e, "accessos")}
          />



          <div className="modules-layout">
            <h3>Módulos</h3>
          </div>
          <ModuleBox handleOpenPicker={() => { }} modulo={null} />
        </form>
        <button className="confirm-curso-btn" onClick={handleSaveCurso}>
          Salvar Curso
        </button>
      </EditarContainer>
      {error && <p>{error}</p>}
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { query } = context;

    console.log(query)
    const responseCurso = await fetch(`https://governante.app/api/curso/list/${query.slug}`);
    const curso = await responseCurso.json();

    return {
      props: {
        curso,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: "Ocorreu um erro ao carregar o curso.",
      },
    };
  }
};

export default EditarCurso;
