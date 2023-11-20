import Logo from "../assets/img/logo.png";
import Image from "next/image";
import { NavMenuContainer } from "../styles/components/navMenu";

export const NavMenu = () => {


  return (
    <NavMenuContainer id="menu">
      <div className="logo-box">
        <div className="img-logo">
          <Image src={Logo}></Image>
        </div>
        <div>
          <span>Olá,</span>
          <p>Fulano</p>
        </div>
      </div>
      <div className="recurses-box">
        <a href="#">
          Meus <b> Cursos</b>{" "}
        </a>
        <a href="#">
          Meu <b> time</b>
        </a>
        <a href="#">
          Minha <b> Carreira</b>
        </a>
        <a href="#">
          Meu <b> Perfil</b>{" "}
        </a>
        <a href="#">
          Minha <b> Trilha</b>
        </a>
        <a href="#">
          Calendário de <b> Treinamentos</b>
        </a>
        <a href="#">
          Editar <b> Cursos</b>
        </a>
        <a href="#">
          Editar <b> Colaboradores</b>
        </a>
        <a href="#">
          Editar <b> Empresa</b>
        </a>
        <a href="#">
          Gerenciar <b> Tenants</b>
        </a>
      </div>
      <a className="exit" href="#">Sair</a>
    </NavMenuContainer>
  );
};

export default NavMenu;
