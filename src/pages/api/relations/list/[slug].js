import { montarCursoPorSlug } from "@/utils/connections";
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

export default async function handler(req, res) {
  const { slug } = req.query;
  if(!slug){
    return res.status(500).json({message:"Slug não encontrado"})
  }

  try {
    const cursoData = await getAllDocuments("cursos");
    const modulosData = await getAllDocuments("modulos");
    const aulasData = await getAllDocuments("aulas");

    const cursoSelecionado = cursoData.find((curso) => curso.slug === slug);

    if (!cursoSelecionado) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }

    const todosModulos = modulosData.filter(
      (modulo) => modulo.slugCurso === cursoSelecionado.slug
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

    const cursoFormatado = await montarCursoPorSlug(req.query.slug)
    // const cursoFormatado = {
    //   capa: cursoSelecionado.capa,
    //   nome: cursoSelecionado.nome,
    //   descricao: cursoSelecionado.descricao,
    //   categoria: cursoSelecionado.categoria,
    //   accessos: cursoSelecionado.accessos,
    //   publicado: cursoSelecionado.publicado,
    //   slug: cursoSelecionado.slug,
    //   modulos: modulosComAulas,
    // };

    await montarCursoPorSlug(req.query.slug)
    res.status(200).json({ data: cursoFormatado });
  } catch (error) {
    console.error("Ocorreu um erro ao recuperar os detalhes do curso:", error);
    res.status(500).json({ error: "Ocorreu um erro ao recuperar os detalhes do curso." });
  }
}
