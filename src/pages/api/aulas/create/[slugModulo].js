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
     
  
    
    const aulaAdicionada = await client.query(
      q.Create(q.Collection("aulas"), {
        data: {
          titulo_aula: req.body.titulo_aula,
          descricao: req.body.descricao,
          video: req.body.video,
          moduloRef: moduloResult.ref.id,
          slugModulo:slugModulo
        },
      })
      );


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
          id:moduloAtualizado.ref.id,
          titulo_aula: aula.data.titulo_aula,
          descricao: aula.data.descricao,
          img: aula.data.img,
          video: aula.data.video,
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
