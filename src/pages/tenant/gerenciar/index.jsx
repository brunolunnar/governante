import Logo from "@/assets/img/logo.png";
import Header from "@/components/header";
import Image from "next/image";
import { UploadBox } from "@/components/uploadBox";
import { GerenciarTenantsContainer } from "@/styles/pages/tenants/gerenciar";
import { useState } from "react";
export const GerenciarTenant = () => {
  const[isOpen, setIsOpen] = useState(false)
  const toggleAccordion = ()=>{
    return setIsOpen(!isOpen)
  }
  return (
    <>
      <Header />

      <GerenciarTenantsContainer>
        <h1>Gerenciando Tenant</h1>
        <form>
          <Image src={Logo} width={150}></Image>
          <input type="text" placeholder="Nome do Tenant" />
          <input type="text" placeholder="Segmento" />
          <input type="text" placeholder="Colaboradores" />
          <input type="text" placeholder="Faturamento" />
          {/* AQUI VAI O ACORDION */}
          <div className="accordion">
      <div className="add-box">
        <button className="add-btn" onClick={(e)=>{
          e.preventDefault()
          toggleAccordion()
        }}>
          {isOpen ? 'Fechar Adicionar Colaborador' : 'Adicionar Colaborador +'}
        </button>
      </div>

      {isOpen && (
        <div className="colaborador-form">
          <input type="text" placeholder="Cargo" />
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="CPF" />
          <textarea placeholder="Descrição"></textarea>
          <label htmlFor="foto">Foto</label>
          <input type="file" id="foto" />
          <UploadBox></UploadBox>
          <div className="save-box">
            <button className="save-btn">Salvar Colaborador</button>
          </div>
        </div>
      )}
    </div>
          <button className="submit-btn">Salvar</button>
        </form>
      </GerenciarTenantsContainer>
    </>
  );
};
export default GerenciarTenant;
