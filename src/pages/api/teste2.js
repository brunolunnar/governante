const cors = require('cors');
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
};
export default async function handler(req, res) {
  cors(corsOptions)(req, res, async () => {
    try {
      // let { email } = req.body;
      let email = "bruno@lunnar.team"
      let user = await paginateIndex({
        key: process.env.FAUNA_MAIN_KEY,
        index: 'users_by_email',
        matchValue: email,
        dataOnly: true,
      });

      let tenantId = user[0].tenants[0];
      let tenant = await paginateIndex({
        key: process.env.FAUNA_MAIN_KEY,
        index: 'tenants_by_id',
        matchValue: tenantId,
        dataOnly: true,
      });

      let keyTenant = tenant[0].key;
      let dbTenant = await paginateIndex({
        key: keyTenant,
        index: 'users_by_email',
        matchValue: email,
        dataRefOnly: true,
      });
      return res.status(200).send({ response: "dbTenant teste sucesso!" });
    } catch (e) {
      console.log(e.message)
      console.log("erro em teste 2")
      return res.status(200).send({ response: "dbTenant teste erro! ( erro na lógida da API, a conexão deu sucesso!)" });
    }
  });
};
