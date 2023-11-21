import { Client, query } from "faunadb";

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

      const cursos = response.data.map((item) => ({
        id: item.ref.id,
        ...item.data,
      }));

      const cursosFiltrados = cursos.filter(
        (curso) => curso.publicado === true && curso.category === "Profissional"
      );

      res.status(200).json({ data: cursosFiltrados });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao recuperar os cursos." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
