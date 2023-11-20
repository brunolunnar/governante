import faunadb from "faunadb";

const { Client, query } = faunadb;
const client = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Método não permitido." });
  }

  const { id } = req.query;
  console.log("id:",id)

  try {
    await client.query(
      query.Delete(query.Ref(query.Collection("tenants"), id))
    );

    return res.status(204).json({ message: "Tenant excluído com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir o tenant." });
  }
}
