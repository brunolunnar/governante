import { query as q, Client } from 'faunadb';

const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { id } = req.query;

  try {

    const aula = await client.query(
      q.Get(q.Ref(q.Collection('aulas'), id))
    );


    const aulaFormatada = {
      id: aula.ref.id,
      nome: aula.data.nome,
      descricao: aula.data.descricao,
      img: aula.data.img,
      video: aula.data.video,
    };

    res.status(200).json({ data: aulaFormatada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter aula pelo ID' });
  }
}
