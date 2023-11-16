import faunadb from "faunadb";

const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Método não permitido, verifique o correto." });
  }
  const { nome, segmento, colaboradores, faturamento } = req.body;

  try {
    const response = await client.query(
      query.Create(query.Collection("tenants"), {
        data: {
          nome,
          segmento,
          colaboradores,
          faturamento,
          colaboradores_cadastrados: [],
        },
      })
    );
    const newTenant = {
      id: response.ref.id,
      ...response.data,
    };
    return res
      .status(201)
      .json({ message: "Tenant criado com sucesso!", data: newTenant });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar tenant. " });
  }
}

