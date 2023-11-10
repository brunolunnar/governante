import React from "react";
import Image from "next/image";
import LogoGov from "@/assets/img/logo-governante-academy.png";
import { LoginContainer } from "@/styles/pages/login";
import { getSession, useSession,signIn } from "next-auth/react";

function Index() {
  return (
    <LoginContainer>
      <Image src={LogoGov} alt={"Logotipo da governante academy"}></Image>
      <button onClick={() => signIn("google")}>
        Fazer login com <b>Google</b>
      </button>
    </LoginContainer>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
  
    return {
      redirect: {
        destination: "/home",
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

export default Index;
