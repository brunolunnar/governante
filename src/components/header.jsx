import React, { useState, useEffect } from "react";
import Image from "next/image";
import Menu from "@/assets/img/menu-hamburger.png";
import Logo from "@/assets/img/logo.png";
import { HeaderContainer } from "@/styles/components/header";
import NavMenu from "./navMenu";


function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenuOnOutsideClick = (e) => {
    if (
      isMenuVisible &&
      e.target.closest(".nav-menu") === null &&
      e.target.closest(".menu-btn") === null
    ) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [isMenuVisible]);

  return (
    <HeaderContainer>
      <Image
        className="menu-btn"
        src={Menu}
        alt="botão para clicar e acessar o menu"
        onClick={toggleMenu}
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

      {isMenuVisible && <NavMenu />}
    </HeaderContainer>
  );
}

export default Header;
