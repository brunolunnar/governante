import { paginateIndex, updateRef, createData } from "@/utils/connections";

export default async function update(req, res) {
  let data = req.body;
  let slug = req.query.slug;

  console.log(data)
  console.log(slug)
  console.log('data & slug')
  try {
    console.log(process.env.FAUNA_MAIN_KEY)
    console.log('process.env.FAUNA_MAIN_KEY')
    let refCurso = await paginateIndex({ key: process.env.FAUNA_MAIN_KEY, index: "cursos_by_slug", matchValue: slug, refOnly: true }).then(resp => { return resp[0] })

    let dataCursoGeral = data
    let modulos = data.modulos
    console.log(modulos)
    console.log(' modulos')


    await Promise.all(
      modulos.map(async modulo => {
        let newAulas = []
        if (!modulo.refFauna) {
          console.log("criar modulo")
          // CRIAR MODULO COM AS AULAS VAZIAS, DADOS CRIAR = {...modulo,aulas:[]}, RETORNAR DADOS DO MODULO NOVO
          let moduloquefoicriado = await createData({ key: process.env.FAUNA_MAIN_KEY, collection: "modulos", data: { ...modulo, aulas: [] } }).then(resp => { return { refFauna: resp.ref.id, ...resp.data } })
          modulo = { ...moduloquefoicriado, aulas: modulo.aulas }
        } else {
          console.log("atualizar modulo")
        }
        await Promise.all(
          modulo.aulas.map(async aula => {
            console.log("aula:", aula)
            if (!aula.refFauna) {
              console.log("criar aula")
              // CRIAR AULA, RETORNAR DADOS DA AULA NOVA
              await createData({ key: process.env.FAUNA_MAIN_KEY, collection: "aulas", data: { ...aula } }).then(resp => { newAulas.push(resp.ref.id) })
            } else {
              console.log("atualizar aula")
              // UPDATE PELA aula.refFauna, DADOS ATUALIZAR = {...aula}
              await updateRef({ key: process.env.FAUNA_MAIN_KEY, collection: "aulas", ref: aula.refFauna, data: { ...aula } })
              newAulas.push(aula.refFauna) // PUSH SOMENTE NO REF
            }
          })
        )

        let newModulo = { ...modulo, aulas: newAulas }
        // UPDATE PELO modulo.refFauna, DADOS ATUALIZAR = {...newModulo}

        console.log("atualziar modulo")
        let updatedModulo = await updateRef({ key: process.env.FAUNA_MAIN_KEY, collection: "modulos", ref: modulo.refFauna, data: { ...newModulo } })
        console.log(updatedModulo)
        console.log("updatedModulo")
      })
    )


    delete data.modulos
    let dataUpdateSemModulo = data
    // console.log(dataCursoGeral)
    // console.log("dataCursoGeral")
    // console.log(dataUpdateSemModulo)
    // console.log("dataUpdateSemModulo")
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
