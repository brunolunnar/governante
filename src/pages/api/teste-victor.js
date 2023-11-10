import { paginateIndex } from "@/utils/connections";

const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};
export default async function handler(req, res) {
  function handleResposta() {
    let dadosUsuario = dbTenant[0] ?? []
    let resposta = {
      tenantValido: !dadosUsuario,
      dadosUsuario: dadosUsuario
    }
    console.log(resposta)
    console.log("resposta")
    return res.status(200).send(resposta);
  }
  cors(corsOptions)(req, res, async () => {
    let { email, validarTenant, pegarDados } = req.body;
    try {
      let user = await paginateIndex({
        key: process.env.FAUNA_MAIN_KEY,
        index: "users_by_email",
        matchValue: email,
        dataOnly: true,
      });
      let tenantId = user[0].tenants[0];
      let tenant = await paginateIndex({
        key: process.env.FAUNA_MAIN_KEY,
        index: "tenants_by_id",
        matchValue: tenantId,
        dataOnly: true,
      });

      let keyTenant = tenant[0].key;
      let dbTenant = await paginateIndex({
        key: keyTenant,
        index: "users_by_email",
        matchValue: email,
        dataRefOnly: true,
      });
      handleResposta()
    } catch (e) {
      return res.status(400)
    }


    // if (validarTenant) {
    //   try {

    //     return res.status(200).send({ tenantValido: true });
    //   } catch (error) {
    //     return res.status(200).send({ tenantValido: false });
    //   }
    // }

  });
}
