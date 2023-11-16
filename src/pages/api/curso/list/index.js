import { Client, query } from "faunadb";

if (!process.env.FAUNA_MAIN_KEY) {
  throw new Error("A variável de ambiente FAUNA_MAIN_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const response = await faunaClient.query(
        query.Map(
          query.Paginate(query.Documents(query.Collection("cursos"))),
          query.Lambda("X", query.Get(query.Var("X")))
        )
      );

      const cursos = response.data.map(async (item) => {
        const modulosResponse = await faunaClient.query(
          query.Map(
            query.Paginate(query.Match(query.Index("modulos_by_curso"), item.ref)),
            query.Lambda("X", query.Get(query.Var("X")))
          )
        );

        const modulos = modulosResponse.data.map((modulo) => ({
          id: modulo.ref.id,
          ...modulo.data,
        }));

        return {
          id: item.ref.id,
          ...item.data,
          modulos,
        };
      });

      const cursosComModulos = await Promise.all(cursos);

      res.status(200).json({ data: cursosComModulos });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao recuperar os cursos." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
