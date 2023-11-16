import { updateRef } from "@/utils/connections";

export default async function update(req, res) {
  let data  = req.body;
  let id = req.query.id;

  try {
    let update = await updateRef({
      key: process.env.FAUNA_MAIN_KEY,
      collection: "modulos",
      data: data,
      ref: id,
      returnInfo:'data'
    });

    return res.json({ data: update });
  } catch (error) {
    console.log("erro:", error.message);
  }
}
