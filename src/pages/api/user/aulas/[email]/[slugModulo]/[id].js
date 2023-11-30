import { query as q, Client } from 'faunadb';

const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { email, slugModulo,id } = req.query;

  try {
    // Buscar a aula pelo ID usando o índice "aulas_by_id"
    const aulaResult = await client.query(
      q.Get(q.Match(q.Index('aulas_by_id'), id))
    );

    const aulaData = q.Select(['data'], aulaResult, null);

    if (!aulaData) {
      return res.status(404).json({ error: 'Aula não encontrada.' });
    }

    // Buscar o objeto de email usando o índice "user_by_curso"
    const userCursoResult = await client.query(
      q.Get(q.Match(q.Index('user_by_curso'), email))
    );

    if (!userCursoResult) {
      return res.status(404).json({ error: 'E-mail não encontrado.' });
    }

    const userCursoRef = q.Select(['ref'], userCursoResult);
    const userCursoData = q.Select(['data'], userCursoResult);

    // Atualizar o campo "aulas" na coleção user_curso com a aula encontrada
    const userCursoResponse = await client.query(
      q.Update(userCursoRef, {
        data: {
          aulas: q.Append(
            {
              id: id,
              titulo_aula: q.Select(['titulo_aula'], aulaData, ''),
              clear:false,
              slugModulo
          
        
            },
            q.Select(['aulas'], userCursoData, [])
          ),
        },
      })
    );

    res.status(200).json({ data: userCursoResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a solicitação.' });
  }
}
