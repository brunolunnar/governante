import { Client, query } from "faunadb";

const faunaClient = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async (req, res) => {
  if (req.method === "PATCH") {
    const { nomeDoCurso } = req.query;

    try {

      const response = await faunaClient.query(
        query.Get(query.Match(query.Index("cursos_by_name"), nomeDoCurso))
      );

      const cursoRef = response.ref;
      const cursoData = response.data;

      const updatedCurso = await faunaClient.query(
        query.Update(cursoRef, {
          data: { ...cursoData, publicado: true },
        })
      );

      res.status(200).json({ data: updatedCurso.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar o curso." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
