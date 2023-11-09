import Logo from "@/assets/img/logo.png";
import Header from "@/components/header";
import Image from "next/image";
import { UploadBox } from "@/components/uploadBox";
import { GerenciarTenantsContainer } from "@/styles/pages/tenants/gerenciar";
export const GerenciarTenant = () => {
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
          <div className="acordion">
            <div className="add-box">
              <button className="add-btn">Adicionar Colaborador +</button>
            </div>
            {/* AQUI VAI O SUB ACORDION CASO SEJA ADCIONADO */}
            <div>Colaborador 1</div>
            <div className="colaborador-form">
              <input type="text" placeholder="Cargo" />
              <input type="text" placeholder="E-mail" />
              <input
                type="text"
                placeholder="
                CPF"
              />
              <textarea placeholder="Descrição"></textarea>
              <label htmlFor="foto">Foto</label>
              <input type="file" id="foto" />
              <UploadBox></UploadBox>
              <div className="save-box">
                <button className="save-btn">Salvar Colaborador</button>
              </div>
            </div>
          </div>
          <button className="submit-btn">Salvar</button>
        </form>
      </GerenciarTenantsContainer>
    </>
  );
};
export default GerenciarTenant;
