import { paginateIndex } from "@/utils/connections";

const cors = require("cors");
const corsOptions = {
  origin: "https://www.governante.app",
  methods: ["GET", "POST","OPTIONS"],
};

export default async function handler(req, res) {
  req.body = JSON.parse(req.body)
  function retornarResposta({ res, resposta, status }) {
    status = status ?? 200;
    return res.status(status).send(resposta);
  }
  cors(corsOptions)(req, res, async () => {
    let resposta = { tenantValido: false };
    try {
      let { email, retornarDados } = req.body;

      if (!email) return retornarResposta({ res, resposta, status: 400 });

      let user = await paginateIndex({
        key: process.env.FAUNA_MAIN_KEY,
        index: "users_by_email",
        matchValue: email,
        dataOnly: true,
      });
      if (!user) return retornarResposta({ res, resposta, status: 400 });

      let tenantId = user[0].tenants[0];
      if (!tenantId) return retornarResposta({ res, resposta, status: 400 });

      let tenant = await paginateIndex({
        key: process.env.FAUNA_MAIN_KEY,
        index: "tenants_by_id",
        matchValue: tenantId,
        dataOnly: true,
      });
      if (!tenant) return retornarResposta({ res, resposta, status: 400 });

      let keyTenant = tenant[0].key;
      if (!keyTenant) return retornarResposta({ res, resposta, status: 400 });

      let dbTenant = await paginateIndex({
        key: keyTenant,
        index: "users_by_email",
        matchValue: email,
        dataRefOnly: true,
      });
      if (!dbTenant) return retornarResposta({ res, resposta, status: 400 });

      resposta = { ...resposta, tenantValido: !!dbTenant[0] };
      let dadosUsuario = dbTenant[0] ?? [];
      if (retornarDados) {
        resposta = { ...resposta, dadosUsuario };
      }
      return retornarResposta({ res, resposta });
    } catch (e) {
      return retornarResposta({ res, resposta, status: 400 });
    }
  });
}
