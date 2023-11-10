import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware';
import { paginateIndex } from '@/utils/connections';

const cors = initMiddleware(
  Cors({
    origin:'*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  })
);

export default async function Teste(req, res) {
  // Execute o middleware CORS antes de processar a solicitação
  await cors(req, res);

  let { email } = req.body;
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

  return res.json({ response: dbTenant });
}
