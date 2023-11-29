import React, { useState, useEffect } from "react";
import Image from "next/image";
import Menu from "../assets/img/menu-hamburger.png";
import Logo from "../assets/img/logo.png";
import { HeaderContainer } from "../styles/components/header";
import NavMenu from "./navMenu";
import { useRouter } from "next/router";
import Link from "next/link";

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

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
  const handleHome = () =>{
    return router.push('/home')
  }
  useEffect(() => {
    document.addEventListener("click", closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [isMenuVisible]);

  useEffect(() => {
    if (isMenuVisible) {
      const timeoutId = setTimeout(() => {
        setIsMenuVisible(false);
      }, 5000); // Adicione um atraso de 5 segundos (ajuste conforme necessário)
      return () => clearTimeout(timeoutId);
    }
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
        <Link href={'/curso/cadastro'}> 
          Meus <b>Cursos</b>
        </Link>
        <a>
          Meu <b>Time</b>
        </a>
        <a>
          Minha <b>Carreira</b>
        </a>
      </div>
      <Image className="logo" src={Logo} alt="Logotipo da empresa" onClick={handleHome}></Image>

      {isMenuVisible && <NavMenu isVisible={isMenuVisible} />}
    </HeaderContainer>
  );
}

export default Header;
