import faunadb from "faunadb";

const { Client, query } = faunadb;
const client = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" }).end();
  }

  const { nomeDoCurso } = req.query;

  try {
    const response = await client.query(
      query.Map(
        query.Paginate(
          query.Match(query.Index("cursos_by_nome"), nomeDoCurso)
        ),
        query.Lambda("X", query.Get(query.Var("X")))
      )
    );

    const modulos = response.data.map((item) => ({
      id: item.ref.id,
      ...item.data,
    }));

    return res.status(200).json({ data: modulos });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar módulos por curso." });
  }
}
