import { useState, useEffect, useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export const Carrousel = ({ filter }) => {
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const router = useRouter();

  const handleRouter = (nome) => {
    const nomeDaAula = nome.replace(/\s+/g, "-");
    return router.push(`/curso/iniciar-curso/${nomeDaAula}`);
  };

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  return (
    <div className="container-carousel">
      <MdArrowBackIos />
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: "grabbing" }}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inner"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {filter.map((curso) => (
            <motion.div
              className="item"
              key={curso.id}
              onClick={() => handleRouter(curso.nome)}
            >
              <img src={curso.capa} alt={curso.nome} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
