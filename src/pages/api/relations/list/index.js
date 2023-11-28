import { Client, query } from "faunadb";

const faunaClient = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

if (!process.env.FAUNA_MAIN_KEY) {
  throw new Error("A variável de ambiente FAUNA_MAIN_KEY não está definida.");
}

async function getAllDocuments(collectionName) {
  const response = await faunaClient.query(
    query.Map(
      query.Paginate(query.Documents(query.Collection(collectionName))),
      query.Lambda("X", query.Get(query.Var("X")))
    )
  );
  return response.data.map((item) => item.data);

}

export default async (req, res) => {
  try {
    const cursoData = await getAllDocuments("cursos");
    const modulosData = await getAllDocuments("modulos");
    const aulasData = await getAllDocuments("aulas");

    const formatado = cursoData.map((curso) => {

      const todosModulos = modulosData.filter(
        (modulo) => {
          return modulo.slugCurso === curso.slug}

      );

      const modulosComAulas = todosModulos.map((modulo) => {
        const aulasFiltradas = aulasData.filter(
          (aula) => aula.slugModulo === modulo.slugModulo
        );
      
        return {
          id: modulo.id,
          titulo_modulo: modulo.titulo_modulo,
          descricao: modulo.descricao,
          aulas: aulasFiltradas,
          slugModulo: modulo.slugModulo,
        };
      });

      return {
        capa: curso.capa,
        nome: curso.nome,
        descricao: curso.descricao,
        categoria: curso.categoria,
        accessos: curso.accessos,
        publicado: curso.publicado,
        slug: curso.slug,
        modulos: modulosComAulas,
      };
    });

    res.status(200).json({ data: formatado });
  } catch (error) {
    console.error("Ocorreu um erro ao recuperar e combinar os dados:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao recuperar os dados combinados." });
  }
};
