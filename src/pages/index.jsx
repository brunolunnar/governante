import React from "react";
import Image from "next/image";
import LogoGov from "../assets/img/logo-governante-academy.png";
import { LoginContainer } from "../styles/pages/login";
<<<<<<< HEAD
import { getSession, useSession, signIn, signOut } from "next-auth/react";
=======
import { getSession, useSession, signIn , signOut} from "next-auth/react";
>>>>>>> df11d55aaecb22b9cd1892b0b6b2bbb44c1692e4
import api from "../services/api";

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

<<<<<<< HEAD
  // if (!session) {
    // return {
    //   props: {
    //     session: null,
    //   },
    // };
  // }
  if (session) {
=======
  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  const userEmail = session.user.email;

  try {
    const apiResponse = await api.post("/api/conectarDb", {
      email: userEmail,
      retonarDados: true,
    });
    const response = apiResponse.data.tenantValido;

    if (!response) {
      alert("email invalido");
      
      const data = await signOut({ redirect: false, callbackUrl: 'https://www.youtube.com/' });

      if (!data?.error) {
        // Successfully signed out
        // You can perform additional actions if needed
        console.log('User signed out successfully');
  
        // Redirect to YouTube front page
        router.push('https://www.youtube.com/');
      } else {
        // Handle sign-out error
        console.error('Error signing out:', data.error);
        router.push('https://www.google.com/');
      }

      return {
        props: {
          session: null,
        },
      };
    }
>>>>>>> df11d55aaecb22b9cd1892b0b6b2bbb44c1692e4
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }else {
    return {
      props: {
        session: null,
      },
    };
  }


  const userEmail = session.user.email;

  // try {
  //   const apiResponse = await api.post("/api/conectarDb", {
  //     email: userEmail,
  //     retonarDados: true,
  //   });
  //   const response = apiResponse.data.tenantValido;
  //   if (!response) {

  //     // const data = await signOut({ redirect: false, callbackUrl: 'https://www.youtube.com/' });

  //     // if (!data?.error) {
  //     //   // Successfully signed out
  //     //   // You can perform additional actions if needed
  //     //   console.log('User signed out successfully');

  //     //   // Redirect to YouTube front page
  //     //   // router.push('https://www.youtube.com/');
  //     // } else {
  //     //   // Handle sign-out error
  //     //   console.error('Error signing out:', data.error);
  //     //   // router.push('https://www.google.com/');
  //     // }

  //     return {
  //       props: {
  //         session: null,
  //       },
  //     };
  //   }
  //   return {
  //     redirect: {
  //       destination: "/home",
  //       permanent: false,
  //     },
  //   };
  // } catch (error) {
  //   console.error("Erro ao processar a requisição para a API:", error);
  //   return {
  //     props: {
  //       session: null,
  //     },
  //   };
  // }
};

export default Index;
