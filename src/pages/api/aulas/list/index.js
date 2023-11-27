import { query as q, Client } from 'faunadb';

const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const aulas = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('aulas'))),
        q.Lambda('aulaRef', q.Get(q.Var('aulaRef')))
      )
    );

    const aulasFormatadas = aulas.data.map(aula => ({
      id: aula.ref.id,
      titulo_aula: aula.data.titulo_aula,
      descricao: aula.data.descricao,
      video: aula.data.video,
    }));

    res.status(200).json({ data: aulasFormatadas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter lista de aulas' });
  }
}
