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
          query.Paginate(query.Documents(query.Collection("modulos"))),
          query.Lambda(
            "moduloRef",
            query.Let(
              {
                modulo: query.Get(query.Var("moduloRef")),
                aulas: query.Map(
                  query.Select(["data", "aulas"], query.Var("modulo")),
                  query.Lambda(
                    "aulaRef",
                    query.Let(
                      {
                        aula: query.Get(query.Var("aulaRef")),
                      },
                      {
                        nome: query.Select(["data", "nome"], query.Var("aula")),
                        descricao: query.Select(["data", "descricao"], query.Var("aula")),
                        img: query.Select(["data", "img"], query.Var("aula")),
                        video: query.Select(["data", "video"], query.Var("aula")),
                        clear: false,
                      }
                    )
                  )
                ),
              },
              {
                id: query.Select(["ref", "id"], query.Var("modulo")),
                name: query.Select(["data", "name"], query.Var("modulo")),
                descricao: query.Select(["data", "descricao"], query.Var("modulo")),
                aulas: query.Var("aulas"),
              }
            )
          )
        )
      );

      const modulosComAulas = response.data.map((modulo) => ({
        id: modulo.id,
        name: modulo.name,
        descricao: modulo.descricao,
        aulas: modulo.aulas,
      }));

      res.status(200).json({ data: modulosComAulas });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao recuperar os módulos com aulas." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
