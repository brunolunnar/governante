import faunadb from "faunadb";
const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });
import { gerarSlug } from "@/utils/slugGenerator";
  
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  let { slug } = req.query;
  const {  titulo_modulo, descricao } = req.body;



  try {
    // Encontrar o curso pelo slug
    const cursoResult = await client.query(
      query.Get(query.Match(query.Index("cursos_by_slug"), slug))
    );

    // Adicionar o módulo à coleção "modulos"
    const moduloAdd = await client.query(
      query.Create(query.Collection("modulos"), {
        data: {
         
          titulo_modulo: titulo_modulo,
          descricao: descricao,
          aulas: [],
          slugModulo: gerarSlug(titulo_modulo),
          slugCurso:slug
        },
      })
    );

   await client.query(
      query.Update(query.Ref(query.Collection("cursos"), cursoResult.ref.id), {
        data: {
          modulos: query.Append(moduloAdd.ref.id, cursoResult.data.modulos),
        },
      })
    );

    const responseData = {
      ts: moduloAdd.ts,
      data: {
        id: moduloAdd.ref.id,
        titulo_modulo: titulo_modulo,
        descricao: descricao,
        aulas: [],
        slugModulo: gerarSlug(titulo_modulo),
        slugCurso:slug
      },
    };
    

    res
      .status(200)
      .json({ message: "Módulo adicionado com sucesso.", data: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar a collection cursos." });
  }
}