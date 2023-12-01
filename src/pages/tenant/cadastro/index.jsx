import Header from "@/components/Header/header";
import { TenantCadastroContainer } from "@/styles/pages/tenants/cadastro/styles";
import { useRouter } from "next/router";


export const CadastroTenant = () => {
    const router = useRouter()
    const handleSubmit = ()=>{

        return router.push('/tenant/gerenciar')
    }
    return (
    <>
      <Header></Header>
      <TenantCadastroContainer>
        <h1>Cadastro Tenant</h1>
        <form>

          <input type="text" placeholder="Nome do Tenant" />
          <input type="text"  placeholder="Segmento"/>
          <input type="text"  placeholder="Colaboradores"/>
          <input type="text"  placeholder="Faturamento"/>
          <input type="text"  placeholder="Colaboradores(Salve para Liberar essa opção)"/>
        </form>
          <button onClick={handleSubmit} className="add-btn">Salvar</button>
      </TenantCadastroContainer>
    </>
  );
};
export default CadastroTenant