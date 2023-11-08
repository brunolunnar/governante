import Header from "@/components/header";
import { signOut, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import Perfil from "@/assets/img/foto-tumb.png";
import Card from "@/assets/img/trilhas-de-consultoria.png";
import { HomePageContainer } from "@/styles/pages/home";

function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Header />
      <HomePageContainer>
        <h3>Olá {session?.user?.name}</h3>
        <ul className="history-list">
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
        </ul>

        <h1>Trilha Estratégica</h1>
        <ul className="card-box">
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
        </ul>

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
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
          <li>
            <Image src={Card}></Image>
          </li>
        </ul>

        <button onClick={() => signOut()}>Sair</button>
      </HomePageContainer>
    </>
  );
}
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default Home;
