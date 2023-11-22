import Header from "../components/header";
import { signOut, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import Perfil from "../assets/img/foto-tumb.png";
import Card from "../assets/img/trilhas-de-consultoria.png";
import { HomePageContainer } from "../styles/pages/home";
import { useRouter } from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home({ cursos }) {
  const { data: session } = useSession();
  let curso = cursos.data;
  let FilterProfissional = curso.filter((trilha) => {
    return trilha.category === "Profissional";
  });
  let FilterEstrategica = curso.filter((trilha) => {
    return trilha.category === "Estratégica";
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <Header />
      <HomePageContainer>
        <h3>Olá {session?.user?.name}</h3>
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

        <h1>Trilha Estratégica</h1>
        <Slider {...settings}>
          {FilterEstrategica.map((curso) => (
       
              <div className="card" key={curso.id}>
                <img src={curso.capa} alt={curso.nome} />
                <p>{curso.nome}</p>
              </div>
      
          ))}
        </Slider>

        <h1>Meu Time</h1>
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
        </ul>
        <h1>Trilha Profissional</h1>
        <ul className="card-box">
          {FilterProfissional.map((curso) => {
            return (
              <li key={curso.id}>
                <img src={curso.capa} width={300} alt={curso.nome} />
                <p>{curso.nome}</p>
              </li>
            );
          })}
        </ul>

        <button onClick={() => signOut("google")}>Sair</button>
      </HomePageContainer>
    </>
  );
}
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const response = await fetch(
    "https://governante.vercel.app/api/curso/publicado"
  );
  if (!response.ok) {
    console.error(`Erro ao obter dados da API: ${response.statusText}`);
    return { props: { cursos: [] } };
  }
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const data = await response.json();
  return {
    props: {
      session,
      cursos: data,
    },
  };
};

export default Home;
