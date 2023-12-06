import { paginateIndex, updateRef } from "@/utils/connections";

export default async function update(req, res) {
  let data = req.body;
  let slug = req.query.slug;

  console.log(data)
  console.log(slug)
  console.log('data & slug')
  try {
    console.log(process.env.FAUNA_MAIN_KEY)
    console.log('process.env.FAUNA_MAIN_KEY')
    let refCurso = await paginateIndex({ key: process.env.FAUNA_MAIN_KEY, index: "cursos_by_slug", matchValue: slug, refOnly: true}).then(resp => {return resp[0]})

    let dataCursoGeral = data 
    delete data.modulos
    let dataUpdateSemModulo = data
    console.log(dataCursoGeral)
    console.log("dataCursoGeral")
    console.log(dataUpdateSemModulo)
    console.log("dataUpdateSemModulo")
    let updateSemModulo = await updateRef({
      key: process.env.FAUNA_MAIN_KEY,
      collection: "cursos",
      data: data,
      ref: refCurso,
      returnInfo: 'data'
    });
    console.log(updateSemModulo)
    return res.json({ data: updateSemModulo });
  } catch (error) {
    console.log("erro:", error.message);
  }
}
