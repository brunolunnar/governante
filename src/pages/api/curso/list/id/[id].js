import faunadb from "faunadb";

const { Client, query } = faunadb;
const client = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" }).end();
  }

  const { id } = req.query; 

  try {
    const response = await client.query(
      query.Get(query.Ref(query.Collection("cursos"), id))
    );

    const curso = {
      id: response.ref.id,
      ...response.data,
    };

    return res.status(200).json({ data: curso });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar curso por ID." });
  }
}
