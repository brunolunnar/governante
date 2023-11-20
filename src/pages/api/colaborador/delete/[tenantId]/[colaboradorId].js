import faunadb from "faunadb";
const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { tenantId, colaboradorId } = req.query;

    try {
      // Obtém o tenant existente
      const tenantRef = query.Ref(query.Collection("tenants"), tenantId);
      const tenant = await client.query(query.Get(tenantRef));

      // Obtém o array de colaboradores cadastrados
      const colaboradores = query.Select(
        ["data", "colaboradores_cadastrados", "data"],
        tenant
      );

      // Remove o colaborador pelo colaboradorId
      const updatedColaboradores = query.Filter(
        (colaborador) =>
          query.Not(
            query.Equals(
              query.Select(["data", "colaboradorId"], colaborador),
              colaboradorId
            )
          ),
        colaboradores
      );
      // Atualiza o tenant com o array de colaboradores atualizado
      const response = await client.query(
        query.Update(tenantRef, {
          data: {
            colaboradores_cadastrados: updatedColaboradores,
          },
        })
      );

      return res.status(204).json({
        message: "Colaborador excluído com sucesso!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao excluir colaborador." });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido." });
  }
}
