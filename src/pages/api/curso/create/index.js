import { ConnectionFauna } from "@/services/connection_db";
import { createData } from "@/utils/connections";

export default async function create(req, res) {
  let data = req.body;

  let create = await createData({
    key: process.env.FAUNA_MAIN_KEY,
    collection: "cursos",
    data: data,
    returnInfo: "data",
  });

  return res.json({ data: create });
}
