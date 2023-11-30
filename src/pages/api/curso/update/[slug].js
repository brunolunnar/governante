import { updateRef } from "@/utils/connections";

export default async function update(req, res) {
  let data  = req.body;
  let slug = req.query.slug;

  try {
    let update = await updateRef({
      key: process.env.FAUNA_MAIN_KEY,
      collection: "cursos",
      data: data,
      ref: slug,
      returnInfo:'data'
    });

    return res.json({ data: update });
  } catch (error) {
    console.log("erro:", error.message);
  }
}