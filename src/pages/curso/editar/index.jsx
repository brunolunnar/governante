import Image from "next/image";
import Header from "@/components/header";
import { EditarContainer } from "@/styles/pages/cursos/editar";
import { ModuleBox } from "@/components/module-box/Module";
import { useState } from "react";
import useDrivePicker from "react-google-drive-picker";



export const EditarCurso = () => {
  const [openPicker, authResponse] = useDrivePicker();
  const [videoUrlDrive, setVideoUrlDrive] = useState("");

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "759422105899-28m1on4lrvdold5uk4g5tlhkeh6b5fkg.apps.googleusercontent.com",
      developerKey: "AIzaSyDWw3b7z9PFneSaT6eCNk8wfJbik-yRgHY",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      setOrigin: "http://localhost:3000",

      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        if (data.docs && data.docs.length > 0) {
          //aqui para capturar o url do video
          console.log(data.docs[0].url);
          setVideoUrlDrive(data.docs[0].url);
        } else {
          console.error("O array data.docs está vazio ou indefinido.");
        }
      },
    });

  };
  return (
    <>
      <Header></Header>
      <EditarContainer>
        <h1>Editar curso</h1>
        <form>
          <div className="img-box">
    
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
          <div className="modules-layout"><h3>Módulos</h3></div>
          <ModuleBox handleOpenPicker={handleOpenPicker}/>
        </form>
        <button className="confirm-curso-btn">Salvar Curso</button>
      </EditarContainer>
    </>
  );
};

export default EditarCurso;
