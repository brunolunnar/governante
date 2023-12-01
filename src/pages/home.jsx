import { useState, useEffect, useRef } from "react";
import Header from "../components/Header/header";
import { signOut, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import Perfil from "../assets/img/foto-tumb.png";
import { HomePageContainer } from "../styles/pages/home";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomCard } from "@/styles/components/trilhaCarrosel";
import { motion } from "framer-motion";
import { Carrousel } from "@/components/Slider";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Pagination, Scrollbar, Ally} from 'swiper'


function Home({ cursos }) {
  const { data: session } = useSession();
  const carousel = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  let curso = cursos.data;
  let FilterProfissional = curso.filter((trilha) => {
    return trilha.categoria === "Profissional";
  });
  let FilterEstrategica = curso.filter((trilha) => {
    return trilha.categoria === "Estratégica";
  });

console.log(FilterEstrategica)

  return (
    <>
      <Header />
      <HomePageContainer>
        {/* <ul className="history-list">
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
        </ul> */}
        <h1>
          <span>Trilha</span> Estratégica
        </h1>
        <Carrousel filter={FilterEstrategica} />
        {/* <h1>
          <span>Meu</span> Time
        </h1>
        <ul className="time-box">
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
          <li>
            <Image src={Perfil}></Image>
          </li>
        </ul> */}
        <h1>
          <span>Trilha</span> Profissional
        </h1>
        <Carrousel filter={FilterProfissional} />
        <button onClick={() => signOut("google")}>Sair</button>
      </HomePageContainer>
    </>
  );
}
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const response = await fetch(
    "https://governante.app/api/curso/publicado"
  );
  if (!response.ok) {
    console.error(`Erro ao obter dados da API: ${response.statusText}`);
    return { props: { cursos: [] } };
  }
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  const data = await response.json();
  return {
    props: {
      session,
      cursos: data,
    },
  };
};

export default Home;
