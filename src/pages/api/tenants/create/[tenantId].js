import faunadb from "faunadb";

const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { tenantId } = req.query; // Extrai o ID do tenant da URL
    const { colaborador } = req.body; // Dados do colaborador a ser adicionado

    try {
      // Obtém o tenant existente
      const tenant = await client.query(
        query.Get(query.Ref(query.Collection("tenants"), tenantId))
      );

      // Verifica se o campo colaboradores_cadastrados existe
      const colaboradoresCadastrados = query.Select(
        ["data", "colaboradores_cadastrados"],
        tenant,
        null // Valor padrão caso o campo não exista
      );

      // Adiciona o colaborador ao array "colaboradores_cadastrados"
      const response = await client.query(
        query.Update(query.Ref(query.Collection("tenants"), tenantId), {
          data: {
            colaboradores_cadastrados: query.Append(
              colaboradoresCadastrados || [],
              [colaborador]
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
      return res.status(500).json({ message: "Erro ao adicionar colaborador." });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido." });
  }
}
