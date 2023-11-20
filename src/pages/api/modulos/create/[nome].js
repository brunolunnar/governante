import faunadb from "faunadb";
import { v4 as uuidv4 } from 'uuid';

const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  const { v4: uuidv4 } = require('uuid');
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  let { nome } = req.query;
  const { aula,id } = req.body; // adicione mais campos aqui se necessário

  // Verifica se o nome contém hífens antes de fazer a substituição para exibição
  const nomeFormatado = nome.includes('-') ? nome.replace(/-/g, ' ') : nome;

  try {
    const result = await client.query(
      query.Get(query.Match(query.Index("cursos_by_name"), nomeFormatado))
    );

   
    const curso = result.data;
  
    const moduloAdd = await client.query(
      query.Create(query.Collection("modulos"), {
        data: {
          aula: aula,
          // Adicione outros campos do módulo aqui, se necessário
        },
      })
    );

  
    const responseData = {
      ts: moduloAdd.ts,
      data: {
        aula: aula,
        id: uuidv4()
        // Adicione outros campos do módulo aqui, se necessário
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
