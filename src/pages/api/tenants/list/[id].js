import faunadb from "faunadb";

const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const response = await client.query(
        query.Get(query.Ref(query.Collection("tenants"), id))
      );

      const tenant = {
        id: response.ref.id,
        ...response.data,
      };

      res.status(200).json({ data: tenant });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao recuperar o tenant." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
