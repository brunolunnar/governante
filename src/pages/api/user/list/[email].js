import { Client, query } from "faunadb";

if (!process.env.FAUNA_MAIN_KEY) {
  throw new Error("A variável de ambiente FAUNA_MAIN_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.FAUNA_MAIN_KEY,
});

const reorganizarDados = (data) => {
  const cursosMap = new Map();

  data.forEach((curso) => {
    const { owner, cursos, modulos, aulas } = curso;

    cursos.forEach((cursoItem) => {
      const { slug, clear } = cursoItem;

      if (!cursosMap.has(slug)) {
        cursosMap.set(slug, {
          owner,
          cursos: {
            slug,
            clear,
            modulos: [],
          },
        });
      }

      const cursoAtual = cursosMap.get(slug);

      const novoModulos = modulos
        .filter((modulo) => modulo.slugCurso === slug)
        .map((modulo) => {
          const novasAulas = aulas
            .filter((aula) => aula.slugModulo === modulo.slug)
            .map((aula) => {
              return {
                id: aula.id,
                titulo_aula: aula.titulo_aula,
                clear: aula.clear,
                slugModulo: aula.slugModulo,
              };
            });

          return {
            slug: modulo.slug,
            clear: modulo.clear,
            slugCurso: slug,
            aulas: novasAulas,
          };
        });

      cursoAtual.cursos.modulos.push(...novoModulos);
    });
  });

  return Array.from(cursosMap.values()).map((curso) => curso.cursos);
};

export default async (req, res) => {
  if (!req.query.email) {
    res.status(400).json({ error: "O parâmetro 'email' é obrigatório." });
    return;
  }

  if (req.method === "GET") {
    try {
      const userCursoResult = await faunaClient.query(
        query.Map(
          query.Paginate(query.Match(query.Index("user_by_curso"), req.query.email)),
          query.Lambda("X", query.Get(query.Var("X")))
        )
      );

      if (!userCursoResult || !userCursoResult.data) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const userCursoData = userCursoResult.data.map((doc) => {
        const data = doc.data;

        if (!data || (!data.cursos.length && !data.modulos.length && !data.aulas.length)) {
          return null;
        }

        return {
          owner: data.owner,
          cursos: data.cursos ? data.cursos.map((curso) => curso) : [],
          modulos: data.modulos ? data.modulos.map((modulo) => modulo) : [],
          aulas: data.aulas ? data.aulas.map((aula) => aula) : [],
        };
      });

      const filteredData = userCursoData.filter(Boolean);
      const reorganizedData = reorganizarDados(filteredData);

      res.status(200).json({ data: reorganizedData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar o usuário." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
