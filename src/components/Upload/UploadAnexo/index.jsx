import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/firebase";

// import UploadImage from "@/components/Upload/UploadImage";
import { UploadContainer } from "@/styles/components/uploadBox";
import Cloud from "@/assets/img/upload-cloud.png";

import Image from "next/image";

function UploadAnexo({ onUploadComplete }) {
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileURL, setFileURL] = useState("");
  const inputRef = useRef(null);


  const handleSelectFile = (files) => {
    if (files && files[0] && files[0].size < 10000000) {
      setImageFile(files[0]);
      setSelectedFileName(files[0].name);
    } else {
      console.log("Tamanho do arquivo muito grande ou nenhum arquivo selecionado");
    }
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    if (imageFile) {
      const name = imageFile.name;
      // const storageRef = ref(storage, `gs://governante-9cb91.appspot.com/videos/${name}`);
      const storageRef = ref(storage, `gs://governante-b9ff1.appspot.com/anexos/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      setIsUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progresso do upload: ${progress}%`);
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
          setIsUploading(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadURL(url);
          setIsUploading(false);
          setImageFile(null);
          setSelectedFileName("");
          setUploadProgress(0);
          setFileURL(url);

          // Chama a função de callback com o fileURL após o upload
          onUploadComplete(url);
        }
      );
    } else {
      console.log("Arquivo não encontrado");
    }
  };

  const handleRemoveFile = () => {
    setImageFile(undefined);
    setDownloadURL("");
    setSelectedFileName("");
    setFileURL("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.size < 10000000) {
      setImageFile(file);
      setSelectedFileName(file.name);
    } else {
      console.log("Tamanho do arquivo muito grande ou nenhum arquivo selecionado");
    }
  };

  return (
    <div>

      <UploadContainer className="upload-box">
        {/* <div className="capa-box">
          <label htmlFor="capa" className="up-box">
            <div
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >

              <Image src={Cloud} alt="upload image"></Image>
              <span>Upload da capa</span>

            </div>
          </label>
          <input type="file" id="capa" />
        </div> */}
        <div className="drive-box">
          {downloadURL ? (
            <div>
              <p>Upload Realizado com sucesso!</p>
              <img src={fileURL} className="imageUplodead"></img>
              <button onClick={handleRemoveFile}>Remover Arquivo</button>
            </div>
          ) : (
            <>
              

              <label
                htmlFor="files"
                onClick={() => inputRef.current.click()}
                onDrop={handleDrop}
                className="upload-label"
              >
                <Image src={Cloud} alt="upload image"></Image>
                {selectedFileName || "Selecione o arquivo de Anexo"}
                {isUploading && <progress value={uploadProgress} max={100} />}
              </label>
              <div className="styled-bar"></div>
              <input
                type="file"
                id="files"
                onChange={(files) => handleSelectFile(files.target.files)}
                ref={inputRef}
                style={{ display: "none" }}
                value={fileURL}
                accept=".jpg,.png"
              />
              {/* <img src={fileURL}></img> */}
              <button onClick={handleUploadFile}>Upload</button>
            </>
          )}
        </div>
      </UploadContainer>

      {/* <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h1>Fazer Upload de Arquivo</h1>
        {downloadURL ? (
          <div>
            <p>Upload Realizado com sucesso!</p>
            <p>Caminho do Arquivo: {fileURL}</p>
            <button onClick={handleRemoveFile}>Remover Arquivo</button>
          </div>
        ) : (
          <>
            {isUploading && <progress value={uploadProgress} max={100} />}

            <label
              htmlFor="files"
              onClick={() => inputRef.current.click()}
              onDrop={handleDrop}
            >
              {selectedFileName || "Escolha ou arraste um arquivo aqui"}
            </label>
            <input
              type="file"
              id="files"
              onChange={(files) => handleSelectFile(files.target.files)}
              ref={inputRef}
              style={{ display: "none" }}
              value={fileURL}
              accept=".jpg,.png"
            />
            <button onClick={handleUploadFile}>Upload</button>
          </>
        )}
      </div> */}
    </div >
  );
}

export default UploadAnexo;
