const cors = require('cors');
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
};
export default async function handler(req, res) {
  cors(corsOptions)(req, res, async () => {
    return res.json({ response: "dbTenant teste" });
  });
};