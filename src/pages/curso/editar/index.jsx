import Image from "next/image";
import TrilhaImg from "@/assets/img/trilhas-de-consultoria.png";
import { UploadBox } from "@/components/uploadBox";
import Header from "@/components/header";
import { EditarContainer } from "@/styles/pages/cursos/editar";
import { Input } from "@/components/input";
import { ModuleBox } from "@/components/module-box/Module";

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

          <textarea placeholder="Descrição"/>
          <div className="trilha-box">
            <p>Trilha</p>
            <label htmlFor="prof">Profissional</label>
            <input type="checkbox" id="prof" />

            <label htmlFor="estrategia">Estratégia</label>
            <input type="checkbox" id="estrategia" />
          </div>
          <label htmlFor="access">Acesso ao Curso</label>
          <input type="text" id="access" />
          <ModuleBox />
        </form>
      </EditarContainer>
    </>
  );
};

export default EditarCurso;
