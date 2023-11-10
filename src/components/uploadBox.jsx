import { UploadContainer } from "@/styles/components/uploadBox";
import Image from "next/image";
import UploadImage from "@/assets/img/upload-cloud.png";
import useDrivePicker from 'react-google-drive-picker'
import { useEffect } from "react";
export const UploadBox = () => {
  const [openPicker, authResponse] = useDrivePicker();  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "759422105899-1k2vemtkjgmc74aodvf7rqj3j3doe9ao.apps.googleusercontent.com",
      developerKey: "AIzaSyBOnX51JJqlStwBbOVyDV94d-Fk6P_XpKI",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }
  return (
    <UploadContainer className="upload-box">
      <div className="capa-box">
        <label htmlFor="capa" className="up-box">
          <Image src={UploadImage}></Image>
          <span>Upload da capa</span>
        </label>
        <input type="file" id="capa" />
      </div>
      <div className="drive-box">
        <label htmlFor="drive" className="drive-description">
          Buscar no Drive
        </label>
        <input type="file" id="drive" />
      </div>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </UploadContainer>
  );
};
