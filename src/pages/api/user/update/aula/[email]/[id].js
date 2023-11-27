import { query as q, Client } from "faunadb";

const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { email, id } = req.query;

  try {

    const userCursoResult = await client.query(
      q.Get(q.Match(q.Index("user_by_curso"), email))
    );

    if (!userCursoResult) {
      return res.status(404).json({ error: "E-mail não encontrado." });
    }

    const userCursoRef = q.Select(["ref"], userCursoResult);
    const userCursoData = q.Select(["data"], userCursoResult);


    const userCursoResponse = await client.query(
      q.Update(userCursoRef, {
        data: {
          aulas: q.Map(
            q.Select(["aulas"], userCursoData, []),
            q.Lambda(
              "aula",
              q.If(
                q.Equals(q.Select(["id"], q.Var("aula")), id),
                q.Merge(q.Var("aula"), { clear: true }),
                q.Var("aula")
              )
            )
          ),
        },
      })
    );

    res.status(200).json({ data: userCursoResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
}
