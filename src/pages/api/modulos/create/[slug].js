import faunadb from "faunadb";
const { Client, query } = faunadb;
const client = new Client({ secret: process.env.FAUNA_MAIN_KEY });

function gerarRef() {
    
    let quantiaNumeros = 5
  
    let numerosAleatorios = '';
        for (let i = 0; i < quantiaNumeros; i++) {
      numerosAleatorios += Math.floor(Math.random() * 10);
    }
    return numerosAleatorios
    
  }
    
  
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  let { slug } = req.query;
  const {  nome, description } = req.body;



  try {
    // Encontrar o curso pelo slug
    const cursoResult = await client.query(
      query.Get(query.Match(query.Index("cursos_by_slug"), slug))
    );

    // Adicionar o módulo à coleção "modulos"
    const moduloAdd = await client.query(
      query.Create(query.Collection("modulos"), {
        data: {
         
          nome: nome,
          description: description,
          aulas: [],
          slug: slug,
          ref:gerarRef()
        },
      })
    );

    // Adicionar a referência do módulo ao array "modulos" no curso correspondente
    const cursoAtualizado = await client.query(
      query.Update(query.Ref(query.Collection("cursos"), cursoResult.ref.id), {
        data: {
          modulos: query.Append(moduloAdd.ref, cursoResult.data.modulos),
        },
      })
    );

    const responseData = {
      ts: moduloAdd.ts,
      data: {
 
        id: moduloAdd.ref.id,
        name: nome,
        description: description,
        aulas: [],
        slugDoCurso: slug,
        ref:gerarRef()
      },
    };

    res
      .status(200)
      .json({ message: "Módulo adicionado com sucesso.", data: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar a collection cursos." });
  }
}
