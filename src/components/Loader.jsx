import LogoGovernante from "@/assets/img/logo-governante-academy.png";
import LoadingSvg from "@/assets/img/fade-stagger-circles.svg";
import Image from "next/image";
import { LoaderContainer } from "@/styles/components/loader";
import { useEffect, useState } from "react";

export const Loader = ({loaded}) => {
  

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setLoaded(true)
  //   },2000)
  // },[])

  

  return (
    <LoaderContainer>
      {/* <Image src={LogoGovernante}></Image> */}
      <div className={ `loader-container ${ loaded? "off" : "on"}` }>
        <h1>Carregando</h1>
 
      </div>

    </LoaderContainer>
  );
};
