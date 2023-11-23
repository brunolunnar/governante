import { query as q, Client } from 'faunadb';

const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const modulos = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('modulos'))),
        q.Lambda('moduloRef', q.Get(q.Var('moduloRef')))
      )
    );

    const modulosFormatados = modulos.data.map(modulo => ({
      id: modulo.ref.id,
      name: modulo.data.name,
      descricao: modulo.data.descricao,
      aulas: modulo.data.aulas.map(aula => ({
        nome: aula.nome,
        descricao: aula.descricao,
        img: aula.img,
        video: aula.video,
        clear: aula.clear,
      })),
    }));

    res.status(200).json({ data: modulosFormatados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter lista de módulos e aulas' });
  }
}
