import { Client, query } from "faunadb";


if (!process.env.FAUNA_MAIN_KEY) {
  throw new Error("A variável de ambiente FAUNA_MAIN_KEY não está definida.");
}
const faunaClient = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async (req, res) => {
  if (req.method === "GET") {
    const userId = req.query.id; // Obtém o ID do parâmetro da URL

    try {
      const response = await faunaClient.query(
        query.Get(query.Ref(query.Collection("cursos"), userId))
      );

      const usuario = {
        id: response.ref.id,
        ...response.data,
      };

      res.status(200).json({ data: usuario });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao recuperar o usuário." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
