import Header from "@/components/header";
import Image from "next/image";
import UploadImage from "@/assets/img/upload-cloud.png";
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
          <div className="upload-box">
            <div className="capa-box">
              <label id="capa">
                <Image src={UploadImage}></Image>
              </label>
              <input type="file" id="capa" />
            </div>
            <div className="drive-box">
              <label id="drive">Buscar no Drive</label>
              <input type="file" id="drive" />
            </div>
          </div>

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
