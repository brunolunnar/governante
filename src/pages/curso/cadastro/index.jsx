import Header from "@/components/header";
import { CadastroCursoContainer } from "@/styles/pages/cursos/cadastro";
import useDrivePicker from "react-google-drive-picker";
import React, { useState } from "react";
import Lock from "@/assets/img/lock.png";
import Image from "next/image";
import UploadBox from "@/components/uploadBox";
import { useRouter } from "next/router";
import UploadCadastro from "@/components/Upload/UploadCadastro";


export default function CadastroCurso() {
  const [openPicker, authResponse] = useDrivePicker();
  const [videoUrlDrive, setVideoUrlDrive] = useState()
  const router = useRouter()
  const [cursodata, setCursoData] = useState({
    nomeCurso: "",
    descricao: "",
    trilha: "",
    acessoCurso: "",
    videoUrlDrive: "",
  })


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
  };
  // console.log(videoUrlDrive)
  // console.log('setVideoUrlDrive')

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setCursoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveCurso = async (e) => {
    e.preventDefault();
    const nomeCursoSemEspacos = cursodata.nomeCurso
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([^\w]+|\s+)/g, '-')
    .replace(/(^-+|-+$)/, '');

    try {
      const response = await fetch("/api/curso/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cursodata,
          nomeCurso: nomeCursoSemEspacos,
          video:videoUrlDrive
        }),
      });
  
      if (response.ok) {
        console.log("Curso criado com sucesso!");
      
        router.push(`/curso/editar/${nomeCursoSemEspacos}`);
      } else {
        console.error("Erro ao salvar o curso.");
      }
    } catch (error) {
      console.error("Erro ao salvar o curso:", error);
    }
  };
  return (
    <>
      <Header></Header>
      <CadastroCursoContainer>
        <h1>
          Cadastro de <b>Curso</b>
        </h1>
        <form onSubmit={handleSaveCurso}>
          <UploadCadastro handleOpenPicker={handleOpenPicker}/>
        <input
          type="text"
          placeholder="Nome do Curso"
          name="nomeCurso"
          value={cursodata.nomeCurso}
          onChange={handleChange}
        />

        <textarea
          placeholder="Descrição"
          name="descricao"
          value={cursodata.descricao}
          onChange={handleChange}
        ></textarea>

        <div className="trilha">
          <p>Trilha</p>
          <label htmlFor="prof">Profissional</label>
          <input
            id="prof"
            className="trilha-check"
            type="radio"
            name="trilha"
            value="Profissional"
            checked={cursodata.trilha === "Profissional"}
            onChange={handleChange}
          />

          <label htmlFor="estrategia">Estratégica</label>
          <input
            id="estrategia"
            className="trilha-check"
            type="radio"
            name="trilha"
            value="Estratégica"
            checked={cursodata.trilha === "Estratégica"}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="access">Acesso ao Curso</label>
        <input
          id="access"
          type="text"
          placeholder="Acesso ao curso"
          name="acessoCurso"
          value={cursodata.acessoCurso}
          onChange={handleChange}
        />

        <div className="block">
          Módulos (Salve para liberar essa opção)
        </div>

        <button type="submit" className="confirm-btn">
          Salvar Curso
        </button>
      </form>
      </CadastroCursoContainer>
    </>
  );
}
