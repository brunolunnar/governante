import { Client, query } from "faunadb";
import { gerarSlug } from "@/utils/slugGenerator";

if (!process.env.FAUNA_MAIN_KEY) {
  throw new Error("A variável de ambiente FAUNA_MAIN_KEY não está definida.");
}
const faunaClient = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async (req, res) => {

  if (!req.query.email) {
    res.status(400).json({ error: "O parâmetro 'email' é obrigatório." });
    return;
  }

  if (req.method === "POST") {
    try {
      const response = await faunaClient.query(
        query.Create(
          query.Collection("user_cursos"),
          {
            data: {
              owner:req.query.email,
              cursos: [],
              modulos: [],
              aulas: [],
            },
          }
        )
      );

      res.status(200).json({ data: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocorreu um erro ao criar o curso." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
