import React, { useState } from "react";
import Menu from "@/assets/img/menu-hamburger.png";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "./style";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();
  const handleHome = () => router.push("/home");

  const showSiderbar = () => setSidebar(!sidebar);

  return (
    <Container>
      <Image className="menu" src={Menu} onClick={showSiderbar}></Image>
      <div className="header-box">
        <Link className="link" href={"/curso/cadastro"}>
          <span>Meus</span> <b>Cursos</b>
        </Link>
        <Link className="link" href={"/time"}>
          <span> Meu</span> <b>Time</b>
        </Link>
        <Link className="link" href={"/carteira"}>
          <span> Minha</span> <b>Carreira</b>
        </Link>
      </div>
      <Image
        className="logo"
        src={Logo}
        alt="Logotipo da empresa"
        onClick={handleHome}
      ></Image>
      {sidebar && <Sidebar active={setSidebar} />}
    </Container>
  );
};

export default Header;
