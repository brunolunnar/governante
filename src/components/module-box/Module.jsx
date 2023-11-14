import { UploadBox } from "../uploadBox";

export const ModuleBox = () => {
  return (
    <>
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
    </>
  );
};
