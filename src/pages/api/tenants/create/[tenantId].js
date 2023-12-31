import faunadb from "faunadb";
import { v4 as uuidv4 } from "uuid";
const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { tenantId } = req.query; 
    const novoColaborador = {
      ...req.body,
      colaboradorId: uuidv4(),
    }; 

    try {

      const tenant = await client.query(
        query.Get(query.Ref(query.Collection("tenants"), tenantId))
      );

      const response = await client.query(
        query.Update(query.Ref(query.Collection("tenants"), tenantId), {
          data: {
            colaboradores_cadastrados: query.Append(
              query.Select(["data", "colaboradores_cadastrados"], tenant),
              [novoColaborador]
            ),
          },
        })
      );

      const updatedTenant = {
        id: response.ref.id,
        ...response.data,
      };

      return res.status(200).json({
        message: "Colaborador adicionado com sucesso!",
        data: updatedTenant,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao adicionar colaborador." });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido." });
  }
}
