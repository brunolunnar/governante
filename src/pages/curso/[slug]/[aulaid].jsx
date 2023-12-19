import { AulaInitialContianer } from "./style";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "@/components/Header/header";
import { montarCursoPorSlug } from "@/utils/connections";
import { CheckBox } from "@mui/icons-material";

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

    const emptyClasses = {};
    console.log(data)
    console.log('data')
    return (
        <>
            ola mundo
        </>
    );
}

export default AulaCurso;