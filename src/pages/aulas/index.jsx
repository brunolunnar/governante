import Header from "@/components/Header/header";
import Arrow from "@/assets/img/arrow.png";
import Image from "next/image";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

export const Aula = () => {
  return (
    <>
      <Header />
      <h1>Nome do curso</h1>
      <div>
        <SlArrowLeft />
        <iframe src="https://www.youtube.com/watch?v=vkDMs4BcbNU"></iframe>
        <SlArrowRight />
      </div>
    </>
  );
};

export default Aula;
