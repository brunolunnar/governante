import { AulaInitialContianer } from "@/styles/pages/curso/style";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "@/components/Header/header";
import { montarCursoPorSlug } from "@/utils/connections";
import { CheckBox } from "@mui/icons-material";
import { useRouter } from "next/router";
import AulaPlayer from '@/components/AulaPlayer'
import Link from "next/link";
import { Loader } from "@/components/Loader";

export const getServerSideProps = async (context) => {
    try {
        const { query } = context;
        const responseCurso = await fetch(`https://governante.app/api/relations/list/${query.slug}`);
        // const curso = await responseCurso.json();
        const curso = await montarCursoPorSlug(query.slug)
        console.log(curso)
        console.log("curso")

        return {
            props: {
                curso,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                error: "Ocorreu um erro ao carregar o curso.",
            },
        };
    }
};

export const AulaCurso = ({ curso }) => {

    const [loaded, setLoaded] = useState(false)

    const router = useRouter()
    const aulaId = router.query.aulaid
    // console.log(aulaId)
    // console.log('aulaId')

    const data = curso;
    console.log(curso)
    console.log('curso')
    console.log(data)
    const [formData, setFormData] = useState({
        nome: data.nome,
        descricao: data.descricao,
        accessos: data.accessos,
        categoria: data.categoria,
        capa: data.capa,
        publicado: data.publicado,
        modulos: data.modulos,
        slugCurso: data.slug
    });
    console.log(formData)
    console.log('formData')

    const [aulaData, setAulaData] = useState({})

    function handleAulaData({ refAula }) {
        if (!refAula) {
            refAula = aulaId

        }
        console.log(refAula)
        console.log("refAula")
        try {

            formData.modulos.some(modulo => {
                // Filtrando as aulas dentro do módulo
                const aulasFiltradas = modulo.aulas.filter(aula => aula.refFauna === refAula);
                // console.log(aulasFiltradas[0])
                // console.log('aulasFiltradas')

                if (aulasFiltradas.length > 0) {
                    setAulaData(aulasFiltradas[0]);
                    return true; // Para interromper a iteração
                }

                return false
            })

        } catch (erro) {
            console.error('Aula não encontrada ' + erro)

        }
    }


    useEffect(() => {
        handleAulaData({ refAula: aulaId })
    }, []);

    console.log(aulaData)
    console.log('aulaData')

    const emptyClasses = {};

    const handleRouter = async (aula) => {
        await router.replace(`/curso/${formData.slugCurso}/${aula}`)
        handleAulaData({ refAula: aula })
        setTimeout(() => {
            setLoaded(true)
        }, 500)

        return
    };

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 800)
    }, [])

    function nextAula() {
        // formData.modulos.some(modulo => {
        //     // Filtrando as aulas dentro do módulo

        //     const aulasFiltradas = modulo.aulas.filter(aula => aula.refFauna === aulaId);
        //     console.log(aulasFiltradas[0])
        //     console.log('aulasFiltradas')


        // })
        const moduloComAulaDesejada = formData.modulos.find(modulo =>
            modulo.aulas.some(aula => aula.refFauna === aulaId)
        );
        console.log(moduloComAulaDesejada)
        console.log('moduloComAulaDesejada')


    }

    function prevAula() {

    }

    return (
        <>
            <Loader loaded={loaded} />
            <Header></Header>
            <AulaInitialContianer>
                <h1>{formData.nome} | {aulaData.titulo_aula}</h1>

                <div className="video-container">
                    <AulaPlayer video={aulaData.video} />

                    {/* <div id='aula-anterior'>
                        <ExpandMoreIcon />
                    </div>

                    <div id='proxima-aula' onClick={nextAula}>
                        <ExpandMoreIcon />
                    </div> */}
                </div>

                {console.log(aulaData)}
                {console.log('aulaData.video')}


                <div className="acordions-box">
                    <Accordion id="box">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className="acordion-title">Descrição</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="acordion-text">{aulaData.descricao}</p>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion id="box" classes={emptyClasses}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className="acordion-title">Módulos</p>
                        </AccordionSummary>
                        <AccordionDetails classes={emptyClasses}>
                            {formData.modulos.map((modulo) => (
                                <Accordion key={modulo.slugModulo}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-${modulo.slugModulo}-content`}
                                    >
                                        <Typography>{modulo.titulo_modulo}</Typography>
                                    </AccordionSummary>
                                    <div className="acordion-aula-box">
                                        {modulo.aulas.map((aula) => (
                                            <Accordion
                                                id="aula-box"
                                                key={aula.slugAula}
                                                className="acordion-togle"
                                            >
                                                <div className={aula.refFauna == aulaData.refFauna ? "conteudo-acordion current-aula" : "conteudo-acordion "}>
                                                    {console.log(aula.refFauna)}
                                                    {console.log('aulaData.refFauna')}
                                                    {/* <div onClick={() => handleRouter(aula.refFauna)}>{aula.titulo_aula}</div> */}
                                                    <div onClick={() => {
                                                        setLoaded(false)
                                                        handleRouter(aula.refFauna)
                                                    }}>{aula.titulo_aula}</div>

                                                    <CheckBox></CheckBox>
                                                </div>

                                            </Accordion>
                                        ))}
                                    </div>
                                </Accordion>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                    <Accordion id="box">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className="acordion-title">Anexos</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="acordion-text">{formData.descricao}</p>
                        </AccordionDetails>
                    </Accordion>


                </div>
            </AulaInitialContianer>
        </>
    );
}

export default AulaCurso;