import Link from "next/link";
import { SideBarListContainer } from "./styles";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import { useSession, signOut } from "next-auth/react";

export const SideBarList = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <SideBarListContainer>
      <div className="logo-box">
        <div className="img-logo">
          <Image src={Logo} alt="Logotipo da empresa que esta logada"></Image>
        </div>
        <div className="welcome-box">
          <span>Olá,</span>
          <p>{session?.user?.name || "Usuário"}</p>
        </div>
      </div>
      <div className="recurses-box">
        <Link className="link" href="#">
          Meus <b> Cursos</b>{" "}
        </Link>
        <Link className="link" href="#">
          Meu <b> time</b>
        </Link>
        <Link className="link" href="#">
          Minha <b> Carreira</b>
        </Link>
        <Link className="link" href="#">
          Meu <b> Perfil</b>{" "}
        </Link>
        <Link className="link" href="#">
          Minha <b> Trilha</b>
        </Link>
        <Link className="link" href="#">
          Calendário de <b> Treinamentos</b>
        </Link>
        <Link className="link" href="#">
          Editar <b> Cursos</b>
        </Link>
        <Link className="link" href="#">
          Editar <b> Colaboradores</b>
        </Link>
        <Link className="link" href="#">
          Editar <b> Empresa</b>
        </Link>
        <Link className="link" href="#">
          Gerenciar <b> Tenants</b>
        </Link>
        <Link onClick={handleLogout} href={'/'} className="exit">Sair</Link>
      </div>
    </SideBarListContainer>
  );
};
