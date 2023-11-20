import faunadb from "faunadb";

const { Client, query } = faunadb;

const client = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Método não permitido." });
  }

  const { id } = req.query;
  const  novosCampos  = req.body;

  try {
    const response = await client.query(
      query.Update(query.Ref(query.Collection("tenants"), id), {
        data: novosCampos,
      })
    );

    const documentoAtualizado = {
      id: response.ref.id,
      ...response.data,
    };

    return res.status(200).json({ data: documentoAtualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar o documento." });
  }
}
