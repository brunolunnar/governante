import LogoGovernante from "@/assets/img/logo-governante-academy.png";
import LoadingSvg from "@/assets/img/fade-stagger-circles.svg";
import Image from "next/image";
import { LoadingContainer } from "@/styles/components/loading";

export const Loading = () => {
  return (
    <LoadingContainer>
      <Image src={LogoGovernante}></Image>
      <div className="loading-box">
        <h1>Carregando</h1>
 
      </div>

    </LoadingContainer>
  );
};
