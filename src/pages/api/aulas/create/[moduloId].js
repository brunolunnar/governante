import { query as q, Client } from 'faunadb';

const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { moduloId } = req.query;

  try {
    // Adicionar a aula
    const aulaAdicionada = await client.query(
      q.Create(q.Collection('aulas'), {
        data: {
          nome: req.body.nome,
          descricao: req.body.descricao,
          img: req.body.img,
          video: req.body.video,
        },
      })
    );

    // Adicionar a referência da aula ao módulo
    const moduloAtualizado = await client.query(
      q.Update(q.Ref(q.Collection('modulos'), moduloId), {
        data: {
          aulas: q.Append(
            q.Select(['ref'], aulaAdicionada),
            q.Select(['data', 'aulas'], q.Get(q.Ref(q.Collection('modulos'), moduloId)))
          ),
        },
      })
    );

    // Obter os dados formatados do módulo com as aulas
    const aulasCompletas = await client.query(
      q.Map(
        moduloAtualizado.data.aulas,
        q.Lambda(
          'aulaRef',
          q.Get(q.Var('aulaRef'))
        )
      )
    );

    const respostaFormatada = {
      data: {
        id: moduloAtualizado.ref.id,
        name: moduloAtualizado.data.name,
        descricao: moduloAtualizado.data.descricao,
        aulas: aulasCompletas.map(aula => ({
          nome: aula.data.nome,
          descricao: aula.data.descricao,
          img: aula.data.img,
          video: aula.data.video,
          clear:false
        })),
      },
    };

    res.status(200).json(respostaFormatada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar aula ao módulo' });
  }
}
