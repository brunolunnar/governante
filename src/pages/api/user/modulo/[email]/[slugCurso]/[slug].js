import faunadb from "faunadb";

const { Client, query } = faunadb;
const client = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" }).end();
  }

  const { email, slugCurso, slug } = req.query;

  try {
    const userCursoResult = await client.query(
      query.Get(query.Match(query.Index("user_by_curso"), email))
    );

    if (!userCursoResult) {
      return res.status(404).json({ error: "E-mail não encontrado." });
    }

    const userCursoRef = query.Select("ref", userCursoResult);
    const userCursoData = query.Select("data", userCursoResult);

    const slugExists = query.ContainsValue(
      slug,
      query.Select(["modulos"], userCursoData)
    );

    const userCursoResponse = await client.query(
      query.If(
        query.Not(slugExists),
        query.Update(userCursoRef, {
          data: {
            modulos: query.Append(
              [
                query.Merge({ slug: slug, clear: false, slugCurso }, {}),
              ],
              query.Select(["modulos"], userCursoData)
            ),
          },
        }),

        query.Abort("Slug já existe na lista de modulos.")
      )
    );

    // Adicionando slugCurso à resposta
    const responseData = {
      data: userCursoResponse.data,
      slugCurso: slugCurso,
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
}
