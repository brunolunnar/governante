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
    console.log(cursoData)
    const formatado = cursoData.map((curso) => {
      // Todos os módulos, independentemente de terem aulas ou não
      const todosModulos = modulosData.filter((modulo) => modulo.slug === curso.slug);

      // Mapear todos os módulos
      const modulosComAulas = todosModulos.map((modulo) => {
        // Filtrar aulas com base no idModulo do módulo correspondente
        const aulasFiltradas = aulasData.filter((aula) => aula.idModulo === modulo.id);
          console.log(modulo)
        return {
          id: modulo.id,  // Adicionando o campo "id"
          nome: modulo.nome,  // Suponho que o nome seja uma propriedade do módulo
          description: modulo.description,  // Suponho que a description seja uma propriedade do módulo
          aulas: aulasFiltradas,
          slug: modulo.slug,
        };
      });

      return {
        capa: curso.capa,
        nome: curso.nome,
        description: curso.description,
        category: curso.category,
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
