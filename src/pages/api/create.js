import { ConnectionFauna } from "@/services/connection_db";
import { createData } from "@/utils/connections";

export default async function create(req, res) {
  let { email, dadosParaCriar } = req.body;

  let tenantKey = await ConnectionFauna({ email: email });
  let create = await createData({
    key: tenantKey,
    collection: "users",
    data: dadosParaCriar,
    returnInfo: "data",
  });
  return res.json({ res: create });
}

