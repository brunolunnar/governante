import { useState, useEffect, useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Container } from "./styles";
import Pen from '@/assets/img/pen.svg';
import Image from "next/image";

export const Carrousel = ({ filter }) => {
  const carousel = useRef();
  const innerContainer = useRef();
  const [width, setWidth] = useState(0);
  const router = useRouter();

  const handleRouter = (nome) => {
    const nomeDaAula = nome.replace(/\s+/g, "-");
    return router.push(`/curso/iniciar-curso/${nomeDaAula}`);
  };

  const handleEditRouter = (nome) => {
    const nomeDaAula = nome.replace(/\s+/g, "-");
    return router.push(`/curso/editar/${nomeDaAula}`);
  };

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  const moveInnerContainer = (direction) => {
    const currentX = innerContainer.current.style.transform
      ? parseInt(innerContainer.current.style.transform.split("(")[1].split("px")[0])
      : 0;

    const step = 300; //Avanço do carrosel

    const newX = direction === "left" ? currentX + step : currentX - step;

    const leftLimit = 0;
    const rightLimit = -width;

    if (newX > leftLimit) {
      innerContainer.current.style.transform = `translateX(${leftLimit}px)`;
    } else if (newX < rightLimit) {
      innerContainer.current.style.transform = `translateX(${rightLimit}px)`;
    } else {
      innerContainer.current.style.transform = `translateX(${newX}px)`;
    }
  };

  return (
    <Container className="container-carousel">
      <MdArrowBackIos onClick={() => moveInnerContainer("left")} />
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          ref={innerContainer}
          className="inner"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {filter.map((curso) => (
            <motion.div
              className="item"
              key={curso.id}

            >
              <div className="capa-box">
                <div className="homecapa" onClick={() => handleRouter(curso.slug)}>
                  <img src={curso.capa} alt={curso.nome} />
                </div>
                <div>{curso.nome}</div>
                <div className='edit-icon' onClick={() => handleEditRouter(curso.slug)}>
                  <Image src={Pen}></Image>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <MdArrowForwardIos onClick={() => moveInnerContainer("right")} />
    </Container>
  );
};
