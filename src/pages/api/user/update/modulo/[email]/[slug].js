import faunadb from "faunadb";

const { query } = faunadb;
const client = new faunadb.Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { email, slug } = req.query;

  try {
    // Busca o módulo pelo slug usando o índice "modulos_by_slug"
    const moduloResult = await client.query(
      query.Get(query.Match(query.Index("modulos_by_slug"), slug))
    );

    if (!moduloResult) {
      return res.status(404).json({ error: "Módulo não encontrado." });
    }

    const moduloRef = query.Select("ref", moduloResult);

    // Verifica se o módulo pertence ao usuário com o email fornecido
    const userCursoResult = await client.query(
      query.Get(query.Match(query.Index("user_by_curso"), email))
    );

    if (!userCursoResult) {
      return res.status(404).json({ error: "E-mail não encontrado." });
    }

    const userCursoRef = query.Select("ref", userCursoResult);
    const userCursoData = query.Select("data", userCursoResult);

    const moduloBelongsToUser = query.ContainsValue(
      moduloRef,
      query.Select(["modulos"], userCursoData)
    );

    if (!moduloBelongsToUser) {
      return res.status(403).json({ error: "Permissão negada." });
    }

    // Atualiza o campo "clear" para true no módulo encontrado
    const updatedUserCurso = await client.query(
      query.Update(userCursoRef, {
        data: {
          modulos: query.Map(
            query.Select(["modulos"], userCursoData),
            query.Lambda(
              "modulo",
              query.If(
                query.Equals(
                  query.Select(["slug"], query.Var("modulo")),
                  slug
                ),
                query.Merge(query.Var("modulo"), { clear: true }),
                query.Var("modulo")
              )
            )
          ),
        },
      })
    );

    return res.status(200).json({ data: updatedUserCurso.data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
}
