import Header from "../../../components/header";
import CadastroCursoContainer from "../../../styles/pages/cursos/cadastro";
import useDrivePicker from "react-google-drive-picker";
import React, { useState } from "react";
import Lock from "../../../assets/img/lock.png";
import Image from "next/image";



export default function CadastroCurso() {
  const [openPicker, authResponse] = useDrivePicker();
  const [videoUrlDrive, setVideoUrlDrive] = useState("");

  // const customViewsArray = [new google.picker.DocsView()]; // custom view
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
      // customViews: customViewsArray, // custom view
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

    console.log("video:", videoUrlDrive);
  };
  return (
    <>
      <Header></Header>
      <CadastroCursoContainer>
        <h1>
          Cadastro de <b>Curso</b>
        </h1>
        <form>
          {/* <UploadBox handleOpenPicker={handleOpenPicker} /> */}

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
          <label htmlFor="access">Acesso ao Curso</label>
          <input id="access" type="text" placeholder="acesso ao curso" />
          <div className="block">
            Módulos(Salve para liberar essa opção){" "}
            <Image src={Lock} alt="imagem de um cadeado" />{" "}
          </div>
          <button className="confirm-btn">Salvar Curso</button>
        </form>
      </CadastroCursoContainer>
    </>
  );
}

