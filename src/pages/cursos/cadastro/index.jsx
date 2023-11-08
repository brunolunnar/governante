import Header from "@/components/header";
import { UploadBox } from "@/components/uploadBox";
import { CadastroCursoContainer } from "@/styles/pages/cursos/cadastro";


function CadastroCurso() {
  return (
    <>
      <Header></Header>
      <CadastroCursoContainer>
        <h1>
          Cadastro de <b>Curso</b>
        </h1>
        <form>
        <UploadBox/>

          <input type="text" placeholder="Nome do Curso" />
          <textarea placeholder="Descrição"></textarea>
          <div className="trilha">
            <p>Trilha</p> <label htmlFor="prof">Profissional</label>
            <input
              id="prof"
              className="trilha-check"
              type="checkbox"
              value={"Profissional"}
              placeholder="Profissional"
            />
            <label htmlFor="estrategia">Estratégica</label>
            <input
              id="estrategia"
              className="trilha-check"
              type="checkbox"
              value={"Estratégica"}
              placeholder="Estratégica"
            />
          </div>
          <label htmlFor="access" >Acesso ao Curso</label>
          <input
          id="access"
            type="text"
            placeholder="Módulos (Salve para Liberar essa opção)"
          />
          <button className="confirm-btn">Salvar Curso</button>
        </form>
      </CadastroCursoContainer>
    </>
  );
}

export default CadastroCurso;
