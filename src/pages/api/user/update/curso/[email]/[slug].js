import faunadb from "faunadb";

const { Client, query } = faunadb;
const client = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { email, slug } = req.query;

  try {
    // Buscar o objeto de email usando o índice "user_by_curso"
    const userCursoResult = await client.query(
      query.Get(query.Match(query.Index("user_by_curso"), email))
    );

    if (!userCursoResult) {
      return res.status(404).json({ error: "E-mail não encontrado." });
    }

    const userCursoRef = query.Select(["ref"], userCursoResult);
    const userCursoData = query.Select(["data"], userCursoResult);

    // Atualizar o campo "clear" no array "cursos" na coleção user_curso
    const userCursoResponse = await client.query(
      query.Update(userCursoRef, {
        data: {
          cursos: query.Map(
            query.Select(["cursos"], userCursoData),
            q => query.If(
              query.Equals(query.Select(["slug"], q), slug),
              query.Merge(q, { clear: true }),
              q
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
