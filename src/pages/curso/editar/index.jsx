import Image from "next/image";
import TrilhaImg from "@/assets/img/trilhas-de-consultoria.png";
import { UploadBox } from "@/components/uploadBox";
import Header from "@/components/header";
import { EditarContainer } from "@/styles/pages/cursos/editar";
import { Input } from "@/components/input";

export const EditarCurso = () => {
  return (
    <>
      <Header></Header>
      <EditarContainer>
        <h1>Editar curso</h1>
        <form>
          <div className="img-box">
            <Image src={TrilhaImg}></Image>
          </div>
          <input type="text" placeholder="Nome do Curso" />

          <textarea placeholder="Descrição"></textarea>
          <div className="trilha-box">
            <p>Trilha</p>
            <label htmlFor="prof">Profissional</label>
            <input type="checkbox" id="prof" />

            <label htmlFor="estrategia">Estratégia</label>
            <input type="checkbox" id="estrategia" />
          </div>
          <label htmlFor="access">Acesso ao Curso</label>
          <input type="text" id="access" />
          <input type="text" placeholder="Módulos" />
          <div className="add-modulo">
            <button className="select-btn">Adicionar Módulo +</button>
            <input type="text" placeholder="Módulo 01" />
          </div>
          <div className="add-aula">
            <button className="select-btn">Adicionar Aula +</button>
            <input type="text" placeholder="Aula 01" />
            <div className="aula-container">
              <textarea placeholder="Descrição"></textarea>
              <span>Vídeo</span>
              <UploadBox></UploadBox>
              <span>Anexo</span>
              <UploadBox></UploadBox>
              <button className="confirm-btn">Salvar Aula</button>
            </div>
          </div>
        </form>
      </EditarContainer>
    </>
  );
};

export default EditarCurso;
