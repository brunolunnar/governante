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
    const ModulosData = await getAllDocuments("modulos");
    const aulasData = await getAllDocuments("aulas");

    const idModulo = ModulosData.filter((slug)=>{
        return slug.slug
    })
  
    const formatado = cursoData.map((curso) => ({
      capa: curso.capa,
      nome:curso.nome,
      description:curso.description,
      category:curso.category,
      accessos:curso.accessos,
      publicado:curso.publicado,
      slug:curso.slug,
      

    }));
    console.log(idModulo)

    res.status(200).json({ data: aulasData });
  } catch (error) {
    console.error("Ocorreu um erro ao recuperar e combinar os dados:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao recuperar os dados combinados." });
  }
};
