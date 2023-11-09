
import Header from "@/components/header";
import Logo from "@/assets/img/logo-governante-academy.png";
import Image from "next/image";
import { TenantContainer } from "@/styles/pages/tenants/index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import Link from 'next/link'

export const Tenant = () => {
    const [filteredLeads, setFilteredLeads] = useState([]);
  const router = useRouter();
  const handleRouter = () => {
    return router.push("/tenant/cadastro");
  };
  return (
    <>
      <Header></Header>
      <TenantContainer>
        <div className="add-box">
        <h1>Gerenciar <b> Tenants</b></h1>
        <button className="add-btn" onClick={handleRouter}>+
        </button>

        </div>
          <input
            type="text"
            className="filter-tenant"
            placeholder="Faça uma busca"
          />

           <ul>
        <div className="title">
          <p>Empresa</p>
          <p>Segmento</p>
          <p>Funcionários</p>
          <p>Faturamento</p>
        </div>
        {/* {filteredLeads.map((lead) => ( */}
          <li>
            <p>Felipe</p>
            <p>segmento</p>
            <p>colaboradores</p>
            <div className="fature-box">
              <p>faturamento</p>
              <Link href={'/tenant/cadastro'}>
                <button className="btn">
                  <SlArrowRight />
                </button>
              </Link>
            </div>
          </li>
        {/* ))} */}
      </ul>
        
      </TenantContainer>
    </>
  );
};

export default Tenant;
