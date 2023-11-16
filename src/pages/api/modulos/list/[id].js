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
      query.Get(query.Ref(query.Collection("modulos"), id))
    );
    const modulo = {
      id: response.ref.id,
      ...response.data,
    };

    res.status(200).json({ data: modulo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Módulo não encontrado ou não existente. " });
  }
}
