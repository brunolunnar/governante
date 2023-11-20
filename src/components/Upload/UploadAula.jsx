import { UploadContainer } from "@/styles/components/uploadBox";
import Image from "next/image";
import UploadImage from "../../assets/img/upload-cloud.png";






 const UploadAula = ({handleOpenPicker}) => {
  return (
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
          id="drive"
          onClick={(e) => {
            e.preventDefault();
            handleOpenPicker();
          }}
        />
      </div>
    </UploadContainer>
  );
};

export default UploadAula