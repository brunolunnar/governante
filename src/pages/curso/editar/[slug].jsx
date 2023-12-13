import Header from "@/components/Header/header";
import { EditarContainer, ImageBox } from "@/styles/pages/curso/editar";
import { ModuleBox } from "@/components/module-box/Module";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { gerarSlug } from "@/utils/slugGenerator";

//upload image
import { storage } from "@/utils/firebase";
import UploadImage from "@/components/Upload/UploadImage";

import Image from "next/image";
import Pen from '@/assets/img/pen.svg';

import { UploadContainer } from "@/styles/components/uploadBox";
import { montarCursoPorSlug } from "@/utils/connections";



export const getServerSideProps = async (context) => {

  try {
    const { query } = context;

    console.log(query)
    const responseCurso = await fetch(`https://governante.app/api/relations/list/${query.slug}`);
    // const curso = await responseCurso.json();
    const curso = await montarCursoPorSlug(query.slug)
    console.log(curso)
    console.log("curso")

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

export const EditarCurso = ({ curso, error }) => {
  const [fileUrl, setFileUrl] = useState(curso.capa);

  const [pubIsChecked, setPubChecked] = useState(false);

  const data = curso
  console.log(curso)
  console.log("curso")

  const [formData, setFormData] = useState({
    nome: data.nome,
    descricao: data.descricao,
    accessos: data.accessos,
    categoria: data.categoria,
    capa: data.capa,
    publicado: data.publicado,
    modulos: data.modulos,
    slugCurso: data.slug
  });

  console.log(formData)
  console.log('formData')

  const router = useRouter()

  const updateTodosModulos = (novosModulos) => {
    setFormData({
      ...formData,
      modulos: novosModulos
    });
    console.log('mudança de módulos feita')
  };

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleCheckboxChange = (e, fieldName) => {
    setPubChecked(!pubIsChecked)
    setFormData({
      ...formData,
      publicado: pubIsChecked
    });
  };


  const handleSlugModulos = () => {
    console.log('rodou handleSlugModulos')
    console.log(formData)
  
    const modulosComSlug = formData.modulos.map((modulo) => {
      let slugModulo = gerarSlug(modulo.titulo_modulo)
      modulo.aulas = modulo.aulas.map(aula => {
        if(!!aula.slugModulo) {
          return aula
        }else {
          return { ...aula, slugModulo}
        }
      })
      if (!modulo.slugModulo) {
        console.log('atribuindo slugModulo')
        console.log(modulo.titulo_modulo)
        console.log('######## modulo titulo')
        console.log(slugModulo)
        console.log("slugModulo ||||||||||||||||||||||||||||||")
        console.log("|||||||||||||||||||||||||||||||||||||||||")
  
        let slugGerada = { ...modulo, slugModulo };
       
        return slugGerada
      } else {
        return modulo;
      }
  
    })
    // resposta para a API
    console.log(modulosComSlug)
    console.log('modulosComSlug')
    setFormData({ ...formData, modulos: modulosComSlug });
  }


  const handleSaveCurso = async () => {
    console.log(formData.modulos)
    console.log('formData.modulos do salvamento')
    handleSlugModulos()
    // handleSlugAulas()

    const queryUrl = router.query
    console.log("aqui é  query do userouter", queryUrl.slug)
    console.log(formData)
    try {
      const response = await fetch(`/api/curso/update/${queryUrl.slug}`
        , {
          method: "POST",
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleRemoveCapa() {
    setFormData((prevData) => ({
      ...prevData,
      capa: ""
    }));
  }

  const handleUploadComplete = (url) => {
    setFileUrl(url);
  };

  useEffect(() => {
    // Código a ser executado quando a variável 'algumaPropriedade' for alterada
    console.log('fileUrl foi alterada:', fileUrl);
    setFormData((prevData) => ({
      ...prevData,
      capa: fileUrl
    }));
  }, [fileUrl]);

  return (
    <>
      <Header></Header>
      <EditarContainer>

        <h1>Editando <b>{data.nome}</b></h1>
        <form>
          {formData.capa ?
            <div className='Image-holder'>
              <div className="Image-Box">

                <img src={formData.capa} alt="" />
                <button onClick={handleRemoveCapa}>
                  <Image src={Pen}></Image>
                </button>

              </div>
            </div>
            :
            <div className='Image-holder'>

              <UploadContainer className="upload-box">
                <div className="capa-box">
                  <label htmlFor="capa" className="up-box">
                    <Image src={UploadImage} alt="upload image"></Image>
                    <span>Upload da capa</span>
                  </label>
                  <input type="file" id="capa" />
                </div>
                <div className="drive-box">
                  <label htmlFor="drive" className="drive-description">
                    Buscar no Drive 
                  </label>
                  <input
                    type="file"
                  />
                </div>
              </UploadContainer>
              <UploadImage onUploadComplete={handleUploadComplete} />
            </div>
          }

          <div className="img-box"></div>
          <input type="text" placeholder='Nome do Curso' value={formData.nome} onChange={(e) => handleInputChange(e, "nome")} />
          <textarea
            placeholder='descrição'
            value={formData.descricao}
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
                  checked={formData.categoria === 'Profissional'}
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
                  checked={formData.categoria === 'Estratégica'}
                  onChange={handleChange}
                />
                <span>Estratégica</span>
              </label>
            </div>
          </div>


          <div className="modules-layout">
            <h3>Módulos</h3>
          </div>
          <ModuleBox formData={formData} estadoModulos={formData.modulos} onUpdateTodosModulos={updateTodosModulos}></ModuleBox>

          <div className="publicar-box">
            <div className='publicar-text'>
              <label htmlFor="publicar" >Publicar o Curso</label>
              <div>(Se marcar essa opção o acesso ao curso estará disponível)</div>
            </div>
            <input
              type="checkbox"
              id="publicado"
              nome='publicado'
              value={false}
              checked={formData.publicado == true}
              onChange={(e) => handleCheckboxChange(e, "publicado")} />

          </div>

        </form>

        <button className="confirm-curso-btn" onClick={handleSaveCurso}>
          Salvar Curso
        </button>
      </EditarContainer>
      {error && <p>{error}</p>}
    </>
  );
};
export default EditarCurso;
