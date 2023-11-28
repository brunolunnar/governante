import Header from "@/components/header";
import { CadastroCursoContainer } from "@/styles/pages/cursos/cadastro";
import useDrivePicker from "react-google-drive-picker";
import React, { useState } from "react";
import Lock from "@/assets/img/lock.png";
import Image from "next/image";
import UploadBox from "@/components/uploadBox";
import { useRouter } from "next/router";
import UploadCadastro from "@/components/Upload/UploadCadastro";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/utils/firebase";
import Upload from "@/components/Upload/Upload";
import { toast } from 'react-toastify';


export default function CadastroCurso() {
  const [openPicker, authResponse] = useDrivePicker();
  const [videoUrlDrive, setVideoUrlDrive] = useState();
  const [file, setFile] = useState(null);

  const onFileChange = (files) => {
    const currentFile = files[0];
    setFile(files);
  };
  const router = useRouter();
  const [cursodata, setCursoData] = useState({
    nome: "",
    descricao: "",
    trilha: "",
    acessoCurso: "",
    capa: "",
    slug:""
  });

  // const handleOpenPicker = () => {
  //   openPicker({
  //     clientId:
  //       "759422105899-28m1on4lrvdold5uk4g5tlhkeh6b5fkg.apps.googleusercontent.com",
  //     developerKey: "AIzaSyDWw3b7z9PFneSaT6eCNk8wfJbik-yRgHY",
  //     viewId: "DOCS",
  //     showUploadView: true,
  //     showUploadFolders: true,
  //     supportDrives: true,
  //     multiselect: true,

  //     setOrigin: "http://localhost:3000",
  //     // customViews: customViewsArray, // custom view
  //     callbackFunction: (data) => {
  //       if (data.action === "cancel") {
  //         console.log("User clicked cancel/close button");
  //       }
  //       if (data.docs && data.docs.length > 0) {
  //         //aqui para capturar o url do video
  //         console.log(data.docs[0].url);
  //         setVideoUrlDrive(data.docs[0].url);
  //       } else {
  //         console.error("O array data.docs está vazio ou indefinido.");
  //       }
  //     },
  //   });
  // };
  const handleClick = () => {
  
    if (file === null) return;
    const fileRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress = Math.trunc(progress);
        console.log(progress);
      },
      (error) => {console.log(`error :${error}`)},
      () => {console.log('sucess')}
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCursoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveCurso = async (e) => {
    e.preventDefault();
 

    try {
      const response = await fetch("/api/curso/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cursodata,

        }),
      });

      if (response.ok) {
        console.log("Curso criado com sucesso!");
        console.log(cursodata)
s
        router.push(`/curso/editar/${slug}`);
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
          <Upload/>
      <CadastroCursoContainer>
        <h1>
          Cadastro de <b>Curso</b>
        </h1>
        <form onSubmit={handleSaveCurso}>
          <UploadCadastro handleOpenPicker={handleOpenPicker} />
          <input
            type="text"
            placeholder="Nome do Curso"
            name="nome"
            onChange={handleChange}
            value={cursodata.nome}
          />
          <textarea
            placeholder="Descrição"
            name="descricao"
            value={cursodata.descricao}
            onChange={handleChange}
          ></textarea>

          <div className="trilha">
            <p>Trilha</p>
            <div className="radio">
              <label htmlFor="prof">
                <input
                  id="prof"
                  className="trilha-check"
                  type="radio"
                  name="trilha"
                  value="Profissional"
                  checked={cursodata.trilha === "Profissional"}
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
                  name="trilha"
                  value="Estratégica"
                  checked={cursodata.trilha === "Estratégica"}
                  onChange={handleChange}
                />
                <span>Estratégica</span>
              </label>
            </div>
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

          <div className="block">Módulos (Salve para liberar essa opção)</div>

          <button type="submit" className="confirm-btn">
            Salvar Curso
          </button>
        </form>
      </CadastroCursoContainer>
    </>
  );
}
