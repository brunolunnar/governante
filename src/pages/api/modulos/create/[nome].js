import faunadb from 'faunadb'
const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  let { nome } = req.query;
  const { aula, name, descricao } = req.body;

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
          name: name,
          descricao: descricao,
          aulas: [],  // Inicializa aulas como um array vazio
        },
      })
    );

    const responseData = {
      ts: moduloAdd.ts,
      data: {
        aula: aula,
        id: moduloAdd.ref.id,  // Use o ID gerado pelo FaunaDB
        name: name,
        descricao: descricao,
        aulas: [],  // Inicializa aulas como um array vazio
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
