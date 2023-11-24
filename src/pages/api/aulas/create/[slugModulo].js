import { query as q, Client } from "faunadb";

const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { slugModulo } = req.query; 
  
  try {
    const moduloResult = await client.query(
      q.Get(q.Match(q.Index("modulos_by_slug"), slugModulo))
      );

  
    // Adicionar a aula
    const aulaAdicionada = await client.query(
      q.Create(q.Collection("aulas"), {
        data: {
          nome: req.body.nome,
          descricao: req.body.descricao,
          img: req.body.img,
          video: req.body.video,
          concluido: false,
          moduloRef: moduloResult.ref.id,
          slugModulo:slugModulo
        },
      })
      );

    // Adicionar a referência da aula ao módulo
    const moduloAtualizado = await client.query(
      q.Update(moduloResult.ref, {
        data: {
          aulas: q.Append(
            q.Select(["ref"], aulaAdicionada),
            q.Select(["data", "aulas"], q.Get(moduloResult.ref))
          ),
        },
      })
    );

    // Obter os dados formatados do módulo com as aulas
    const aulasCompletas = await client.query(
      q.Map(
        moduloAtualizado.data.aulas,
        q.Lambda("aulaRef", q.Get(q.Var("aulaRef")))
      )
    );

    const respostaFormatada = {
      data: {
        id: moduloAtualizado.ref.id,
        titulo_modulo: moduloAtualizado.data.titulo_modulo,
        descricao: moduloAtualizado.data.descricao,
        aulas: aulasCompletas.map((aula) => ({
          nome: aula.data.nome,
          descricao: aula.data.descricao,
          img: aula.data.img,
          video: aula.data.video,
          concluido: false,
          moduloRef: moduloResult.ref.id,
          slugModulo:slugModulo
        })),
      },
    };

    res.status(200).json(respostaFormatada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar aula ao módulo" });
  }
}
