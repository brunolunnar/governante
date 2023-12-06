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
    let dadoCurso = await paginateIndex({ key: process.env.FAUNA_MAIN_KEY, index: "cursos_by_slug", matchValue: slug, refOnly: true}).then(resp => {return resp[0]})

  
    let update = await updateRef({
      key: process.env.FAUNA_MAIN_KEY,
      collection: "cursos",
      data: data,
      ref: dadoCurso,
      returnInfo: 'data'
    });
    console.log(update)
    console.log('update')
    return res.json({ data: update });
  } catch (error) {
    console.log("erro:", error.message);
  }
}
