module.exports = {
  async headers() {
    return [
      {
        // Aplica esses cabeçalhos a todas as rotas
        source: '/api/:path*', 
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Permitindo qualquer origem (não recomendado em produção)
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/cursos/update/:slug*',
        destination: 'https://governante.app/api/curso/update/:slug*', // Roteamento direto para o servidor
      },
    ];
  },
};
