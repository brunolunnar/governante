import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Configure as credenciais
const credentials = require('path/to/your/credentials.json');
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

// Gere a URL de autorização
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/drive'],
});

// Função para obter o token de acesso
const getAccessToken = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
};

export { authUrl, getAccessToken };
