import { Client, query } from "faunadb";
import { gerarSlug } from "@/utils/slugGenerator";

if (!process.env.FAUNA_MAIN_KEY) {
  throw new Error("A variável de ambiente FAUNA_MAIN_KEY não está definida.");
}
const faunaClient = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        capa,
        nome,
        descricao,
        categoria,
        accessos,
        slug
      } = req.body;

      
    
      const response = await faunaClient.query(
        query.Create(
          query.Collection("cursos"),
          {
            data: {
              capa,
              nome,
              descricao,
              categoria,
              accessos,
              modulos:[],
              publicado:true,
              slug
            }
          
          }
        )
      );

      res.status(200).json({ data:response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocorreu um erro ao criar o curso." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
