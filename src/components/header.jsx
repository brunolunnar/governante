import Image from "next/image";
import Menu from "@/assets/img/menu-hamburger.png";
import Logo from "@/assets/img/logo.png";
import { HeaderContainer } from "@/styles/components/header";

function Header() {
  return (
    <HeaderContainer>
      <Image
        className="menu"
        src={Menu}
        alt="botão para clicar e acessar o menu"
      ></Image>
      <div className="header-box">
        <a>
          Meus <b>Cursos</b>
        </a>
        <a>
          Meu <b>Time</b>
        </a>
        <a>
          Minha <b>Carreira</b>
        </a>
      </div>
      <Image className="logo" src={Logo} alt="Logotipo da empresa"></Image>
    </HeaderContainer>
  );
}
export default Header;
