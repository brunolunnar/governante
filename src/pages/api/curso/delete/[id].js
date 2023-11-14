import { deleteByRef } from "@/utils/connections";

export default async function del(req, res) {

  let id = req.query.id;

  try {
    let del = await deleteByRef({
      key: process.env.FAUNA_MAIN_KEY,
      collection: "cursos",
      ref: id,
      returnInfo:'data'
    });

    return res.status(204).json({ data: del });
  } catch (error) {
    console.log("erro:", error.message);
  }
}
