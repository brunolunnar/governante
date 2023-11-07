import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Image from 'next/image';
import LogoGov from '@/assets/img/logo-governante-academy.png';
import { LoginContainer } from "@/styles/pages/login";

function Index() {
  const router = useRouter();
  const handleLogin = () => {
    return router.push("/api/auth/login");
  };
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <LoginContainer>
      <Image src={LogoGov} alt={"Logotipo da governante academy"}></Image>
      <button onClick={handleLogin}>Fazer login com <b>Google</b></button>
    </LoginContainer>
  );
}

export default Index;
